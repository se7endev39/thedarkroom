import React from 'react';
import Hr from 'react-native-hr-component';

function Separator ({style = {}})
{
    return (
        <Hr text="" lineColor="#ccc" thickness={0.5} hrStyles={style} hrPadding={0} textPadding={0}/>
    );
}

export default Separator;
