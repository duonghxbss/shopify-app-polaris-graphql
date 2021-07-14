import {TextField, Button, Modal, Stack, TextContainer, Scrollable} from "@shopify/polaris";
import React, {useCallback, useState, useRef} from "react";
import {TableSelect} from "./TableSelect";
// import ResourceListWithProducts from "./ResourceList";
import {ResourcePicker} from "@shopify/app-bridge-react";
import ResourceListWithProducts from "./ResourceList";

export function SelectSpecificProduct() {

    const [active, setActive] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const node = useRef(null);

    // const handleClick = useCallback(() => {
    //     node.current && node.current.input.focus();
    // }, []);
    //
    // const handleFocus = useCallback(() => {
    //     if (node.current == null) {
    //         return;
    //     }
    //     node.current.input.select();
    //     document.execCommand('copy');
    // }, []);

    const toggleModal = useCallback(() => setActive((active) => !active), []);

    // const search = useCallback((e)=>{ setValueSearch(e.target.value), [valueSearch]});
    const search = useCallback((value) => {
      // handle the click event
      setValueSearch(value)
      toggleModal()
    }, [valueSearch]);
    const activator = <TextField
        // value={name}
        label="Search product"
        labelHidden
        placeholder="Search product"
        onChange={search}
    />;

    return (
        <>
            <Modal
                activator={activator}
                open={active}
                onClose={toggleModal}
                title="SELECT SPECIFIC PRODUCTS"
                primaryAction={{
                    content: 'Select',
                    onAction: toggleModal,
                }}
            >
                <Modal.Section>
                    {/*<Scrollable>*/}
                    {/*    */}
                    {/*</Scrollable>*/}
                    <TableSelect value={valueSearch}/>
                  {/*<ResourceListWithProducts/>*/}
                  {/*<ResourcePicker // Resource picker component*/}
                  {/*  resourceType="Product"*/}
                  {/*  showVariants={false}*/}
                  {/*  // open={this.state.open}*/}
                  {/*  // onSelection={(resources) => this.handleSelection(resources)}*/}
                  {/*  // onCancel={() => this.setState({ open: false })}*/}
                  {/*/>*/}
                </Modal.Section>
            </Modal>
        </>
    );
}
