import { useSearchParams, useParams } from "react-router-dom";

function ComponentParamsWrapper(Component) {
    return function WrappedComponent(props) {
        let [searchParams, setSearchParams] = useSearchParams();
        let params = useParams();
        const query = searchParams;
        return <Component {...props} params={params} query={query} />;
    }
}

export default ComponentParamsWrapper;