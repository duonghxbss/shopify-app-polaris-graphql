import {
    Card,
    DataTable, Page
} from "@shopify/polaris";
import React, {useCallback, useState} from "react";
// import {SelectSpecificProduct} from "./SelectSpecificProduct";

export function TableResult() {
    const rows = [
        ['Emerald Silk Gown', '$875.00'],
        ['Mauve Cashmere Scarf', '$230.00'],
        [
            'Navy Merino Wool Blazer',
            '$445.00'
        ],
    ];

    return (
        <Page>
            <Card>
                <DataTable
                    columnContentTypes={[
                        'text',
                        'numeric'
                    ]}
                    headings={[
                        'Product',
                        'Price'
                    ]}
                    rows={rows}
                    // totals={['', '', '', 255, '$155,830.00']}
                    // showTotalsInFooter
                />
            </Card>
        </Page>
    );
}
