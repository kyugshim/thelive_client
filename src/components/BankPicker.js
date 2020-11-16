import { Picker } from '@react-native-community/picker';
import React from 'react'

export const BankPicker = (props) => {
    return (
        <Picker
            mode="dropdown"
            selectedValue={props.sellerBank}
            style={{ height: 50, width: 200, margin: 5, color: props.sellerBank ? "slateblue" : "slategrey" }}
            itemStyle={{
                fontFamily: "sans-serif-light",
                letterSpacing: -0.5,
                marginLeft: 100
            }}
            onValueChange={(value) => {
                if (value !== "은행 선택") {
                    props.handleFormSeller('sellerBank', value)
                }
            }
            }>
            {props.bankList.map((item, idx) => <Picker.Item label={item} value={item} key={idx} color="slategrey" />)}
        </Picker>
    );
};