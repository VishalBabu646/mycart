import { Helmet } from 'react-helmet-async'

function MetaData({title}) {
  return (
    <Helmet>
        <title>{`${title}`}</title>
    </Helmet>
  )
}

export default MetaData