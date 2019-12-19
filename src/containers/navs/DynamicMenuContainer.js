import React from 'react'
import { useQuery } from 'react-apollo';
import { getObjectProperty } from '../../utils/object';

const DynamicMenuContainer = ({ query, path, component: Component }) => {
    let { data, loading, error } = useQuery(query)
    if (loading) {
        return (
            <div className="loading" />
        )
    }
    if (data) {
        let items = getObjectProperty(data, path) || {}
        return items.map(e => {
            return <Component sub={e} />
        })
    }
    return null
}

export default DynamicMenuContainer
