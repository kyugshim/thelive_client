import Axios from 'axios';
import stripe from 'tipsi-stripe';
import { SERVER } from '../pages/config';
import { doPayment } from './api';

stripe.setOptions({
    publishableKey: 'pk_test_9y1fBZMIdEzt1Gu5AQPzCrJ2',
});

module.exports = {

    requestPayment: (orderInfo) => {
        console.log(orderInfo)
        return stripe
            .paymentRequestWithCardForm()
            .then(stripeTokenInfo => {
                console.log('cardform request response', stripeTokenInfo)
                return doPayment(5000, stripeTokenInfo.tokenId);
            })
            .then(() => {
                Axios.post(`${SERVER}/addorder`, orderInfo)
                    .then((data) => {
                        console.log(data)
                        alert("결제와 주문이 성공적으로 처리되었습니다.")
                    })
                    .catch((err) => {
                        alert("주문처리 과정에서 문제가 발생했습니다, ")
                        console.log(err)
                        return false;
                    })
                console.warn('Payment succeeded!');
                return true;
            })
            .catch(error => {
                console.warn('Payment failed', { error });

            })
    }
}
