import {Card, FormLayout, Heading, RadioButton, Stack, TextField} from "@shopify/polaris";
import React, {useCallback, useState} from "react";

export function CustomPrice() {
    const [priceCustom, setPriceCustom] = useState('');
    const [amount, setAmount] = useState(0);
    const handleAmountChange = useCallback((value) => setAmount(value), []);

    const handlePriceCustomChange = useCallback(
        (_checked, newValue) => setPriceCustom(newValue),
        [],
    );
    return <Card sectioned>
        <FormLayout>
            <Heading>Custom Prices</Heading>
            <Stack vertical>
                <RadioButton
                    label="Apply a price to selected products"
                    checked={priceCustom === 'apply'}
                    id="apply"
                    name="price"
                    onChange={handlePriceCustomChange}
                />
                <RadioButton
                    label="Decrease a fixed amount of original prices of selected products"
                    id="fixed"
                    name="price"
                    checked={priceCustom === 'fixed'}
                    onChange={handlePriceCustomChange}
                />
                <RadioButton
                    label="Decrease the original prices of selected products by a percentage (%)"
                    checked={priceCustom === 'percentage'}
                    id="percentage"
                    name="price"
                    onChange={handlePriceCustomChange}
                />
            </Stack>
            {priceCustom === "apply" ? <TextField
                value={amount}
                label="Amount"
                type={"number"}
                onChange={handleAmountChange}
            /> : priceCustom === "fixed" ?
                <TextField
                    value={amount}
                    label="Fixed amount"
                    type={"number"}
                    onChange={handleAmountChange}
                    prefix="$"
                /> :
                <TextField
                    value={amount}
                    label="Percentage"
                    type={"number"}
                    onChange={handleAmountChange}
                    suffix={"%"}
                />}
        </FormLayout>
    </Card>
}