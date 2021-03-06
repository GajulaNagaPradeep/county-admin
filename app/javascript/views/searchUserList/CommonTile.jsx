import React, { Component } from 'react'
import { Tile } from '@cwds/components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class CommonTile extends Component {
  componentDidMount() {
    this.props.setSearchForTiles(this.props.type, this.props.tilesQuery)
  }

  render() {
    return (
      <Tile title={this.props.title}>
        <div className="tilesContent">{this.props.count}</div>
        {this.renderViewLink()}
      </Tile>
    )
  }

  renderViewLink() {
    if (this.props.count === 0) {
      return <div />
    }
    return (
      <div className="text-right">
        {
          <Link
            to={{
              pathname: '/user_group_search',
              filter: { type: this.props.type, query: this.props.tilesQuery, size: this.props.count },
            }}
          >
            View
          </Link>
        }
      </div>
    )
  }
}

CommonTile.propTypes = {
  setSearchForTiles: PropTypes.func,
  type: PropTypes.string,
  tilesQuery: PropTypes.array,
  title: PropTypes.string,
  count: PropTypes.number,
}

export default CommonTile
