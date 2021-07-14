import {Card, FormLayout, Heading, Select, TextField} from "@shopify/polaris";
import React, {useCallback, useState} from "react";

export function GeneralInfo() {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState(0);
    const [selected, setSelected] = useState('enable');
    const options = [
        {label: 'Enable', value: 'enable'},
        {label: 'Disable', value: 'disable'},
    ];

    const handleNameChange = useCallback((value) => setName(value), []);
    const handlePriorityChange = useCallback((value) => setPriority(value), []);
    const handleSelectChange = useCallback((value) => setSelected(value), []);
    return <Card sectioned>
        <FormLayout>
            <Heading>General Information</Heading>
            <TextField
                value={name}
                label="Name"
                placeholder="Name"
                onChange={handleNameChange}
            />
            <TextField
                value={priority}
                label="Priority"
                type={"number"}
                // placeholder="0"
              pattern={"[0-9]{1,2}"}
                min={"0"}
                max={"99"}

                onChange={handlePriorityChange}
                helpText="Please enter an integer from 0 to 99 is the highest priority."
            />
            {/*<FormLayout.Group>*/}
            {/*</FormLayout.Group>*/}
            <Select
                label="Status"
                options={options}
                onChange={handleSelectChange}
                value={selected}
            />
            {/*<Button primary>Submit</Button>*/}
        </FormLayout>
    </Card>
}
