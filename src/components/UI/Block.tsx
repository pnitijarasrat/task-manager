import React from "react";

interface BlockProp {
    children: React.ReactNode
}

const Block: React.FC<BlockProp> = ({ children }) => {

    return (
        <div style={{ padding: '24px', backgroundColor: 'white', margin: '24px' }}>
            {children}
        </div>
    )
}

export default Block