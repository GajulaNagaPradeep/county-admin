# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'
require 'faraday'

feature 'Search User List Page' do
  scenario 'Can log in' do
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    login
  end

  scenario 'page is accessible' do
    pending 'page has accessibility issues'
    login
    page_is_search
    search_users(last_name: 'Nobody')
    click_add_user
    click_link 'User List'
    page_is_search
    puts current_url
    sleep 5

    check_accessibility
  end

  scenario 'validate user list page' do
    login
    sleep 2
    page_is_search
    # page_has_user_list_headers
    search_users(last_name: 'M')
    sleep 2
    first_count = page_exact_match_users.count
    # expect(first_count).to be > 0
    puts "count users #{first_count}"
    #  THIS IS GIVING DRIVER ERRORS FOR WRONG OBJECT WOULD BE CLICKED.  hide_inactive_users
    #     WORKAROUND BY SIMPLY CLICKING THE LABEL.
    #     THIS MIGHT WORK AROUND IT: find('label', text: 'Include Inactive').click

    #     FOR NOW THE REST OF THE TEST IS DISABLED UNTIL WE CAN SORT OUT HOW TO FIND MULTIPLE USERS

    # sleep 2 # wait for any redraw after search messaging is displayed
    # sleep 2
    # user1_link = page_exact_match_users[0].find('a')[:href]
    # user2_link = page_exact_match_users[1].find('a')[:href]
    # puts "We have two links:  #{user1_link} "
    # require 'pry'; binding.pry
    #   # last_name = user2_link.text.match(/([^,]*),/)[1]
    #   # search_users(last_name: last_name)
    #   # FUTURE  we have no visible indicator that the search finished.
    #   # If we don't wait the list of users on the page may fail because
    #   # it is still changing users
    #   sleep 2
    #   expect_sorted_list(users_on_page)
    #   second_count = page_count_users

    #   expect(second_count).to be <= first_count
    #   puts "count users #{second_count}"
  end

  scenario 'create user button is disabled before search and enabled after' do
    login
    undo_all_search
    check_the_button('CREATE A NEW USER', true)
    search_users(last_name: 'Man')
    check_the_button('CREATE A NEW USER', false)
  end

  scenario 'clear button clears all search' do
    login
    undo_all_search
    check_the_button('CLEAR', true)
    search_users(last_name: 'Man')
    check_the_button('CLEAR', false)
    click_button 'CLEAR'
    check_the_button('CLEAR', true)
  end
end
