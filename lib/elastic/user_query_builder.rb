# frozen_string_literal: true

module Elastic
  class UserQueryBuilder
    include ActiveModel::Model

    def self.get_search(request)
      query(request[:query])
        .merge(paginate_query(request)).merge(sort_query)
    end

    def self.query(query)
      leaves = query_leaves(query)
      if leaves.blank?
        match_all
      else
        bool_and_query(leaves)
      end
    end

    def self.paginate_query(query)
      {
        from: query[:from],
        size: query[:size]
      }
    end

    def self.query_leaves(query)
      query.map do |subquery|
        subquery_as_es(subquery)
      end.compact
    end

    SUBQUERIES = {
      office_ids: ->(value) { { terms: { 'office_id.keyword': value } } unless value.empty? },
      last_name: ->(value) { { match_phrase_prefix: { last_name: value } } unless value.empty? },
      enabled: ->(value) { { term: { enabled: value.to_s } } unless value.to_s.empty? }
    }.freeze

    def self.subquery_as_es(subquery)
      unless SUBQUERIES.key?(subquery[:field].to_sym)
        Rails.logger.debug("unrecognized query field (#{subquery[:field].to_sym})")
        return nil
      end
      SUBQUERIES.fetch(subquery[:field].to_sym).call(subquery[:value])
    end

    def self.sort_query
      { sort: [{ "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }] }
    end

    def self.bool_and_query(query_leaves)
      {
        query: {
          bool: {
            must: query_leaves
          }
        }
      }
    end

    def self.match_all
      {
        query: {
          match_all: {}
        }
      }
    end
  end
end
