import React from "react";
import { useParams } from "react-router-dom"

const WithRouter = (WrappedComponent: any) => (props: any) => {
    const params = useParams();

    return (
        <WrappedComponent {...props} params={params} />
    )
};

export default WithRouter;