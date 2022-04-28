import React from 'react';
import {withUrqlClient} from "next-urql";
import {CreateURQLClient} from "../../utils/CreateURQLClient";

function CreateProduct(props) {
    return (
        <div>
            Create Product
        </div>
    );
}

export default withUrqlClient(CreateURQLClient,{ssr:true})(CreateProduct)