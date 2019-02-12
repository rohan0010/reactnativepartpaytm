import React from 'react';
import { WebView,View,Text,TouchableOpacity,Modal } from 'react-native';
import axios from 'axios';

export default class PaymentsScreen extends React.Component {

    state = {
        showModal:false,
        ack: "",
        ORDER_ID: 'dkfsfsdfdfganjjnnnnnsdsqedflkkn3435',
        CUST_ID: 'Aditya123',
        TXN_AMOUNT: '10'
    }

    handleResponse = title => {
        if(title == 'true') {
            //handle successfull payment here
            this.setState({showModal: false, ack:'Your transaction was successful!'})
        }else if(title == 'false') {
            this.setState({showModal:false,ack:'Oops! Something went wrong!'})
            //handle failed payment here
        }else return;
    }

    render() {
        
        let { showModal,ack,ORDER_ID, CUST_ID, TXN_AMOUNT } = this.state;

        return (
            <View style={{marginTop:20}}>
            <TouchableOpacity 
            onPress={() => this.setState({showModal:true})}
            >
            <Text > Pay with paytm </Text>
            </TouchableOpacity>
            <View style={{marginTop:20}}>
            <Text> {ack} </Text>
            </View>
            <Modal
            visible={showModal}
            onRequestClose={() => this.setState({showModal:false})}
            >
            <WebView
                source={{uri: +'http://192.168.1.107/api/paytm/request'}}            
                injectedJavaScript = {`document.getElementById("ORDER_ID").value = "${ORDER_ID}";document.getElementById("CUST_ID").value = "${CUST_ID}";document.getElementById("TXN_AMOUNT").value = "${TXN_AMOUNT}";document.f1.submit();`}
                onNavigationStateChange = {(data) => this.handleResponse(data.title)}
            />
            </Modal>
            </View>
        );
    }
}