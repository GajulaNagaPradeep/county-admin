# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'
require 'faraday'
feature 'user list filters by office' do
  scenario 'Filter by office user list page' do
    login
    sleep 2
    clear_offices_from_select

    search_users(last_name: '', include_inactive: false)
    wait_for_load_complete

    all_users_count = total_count_users
    expand_changelog_component
    all_count_changelog = count_changelog_events

    office_name = 'CWDS CARES IM Lake Testing Office BinthuK2' # pick_single_office_name

    search_by_office(office_name, '', false)

    filtered_users_count = total_count_users
    expand_changelog_component
    filtered_changelog_count = count_changelog_events
    puts "user counts: #{filtered_users_count} ?< #{all_users_count}"
    puts "changelog counts: #{filtered_changelog_count} ?< #{all_count_changelog}"

    expect(filtered_users_count).to be < all_users_count
    expect(filtered_changelog_count).to be < all_count_changelog
  end
end