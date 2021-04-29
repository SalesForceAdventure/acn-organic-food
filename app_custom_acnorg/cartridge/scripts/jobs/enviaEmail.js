
//var Transaction = require("dw/system/Transaction"); 
//var Order = require('dw/order/Order');


function mandarEmail(order){

var Order = require('dw/order/Order');
var Resource = require('dw/web/Resource');
var Site = require('dw/system/Site');
var OrderModel = require('*/cartridge/models/order');
var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
var Locale = require('dw/util/Locale');

    var currentLocale = Locale.getLocale(order.getCustomerLocaleID());

    var orderModel = new OrderModel(order, { countryCode: currentLocale.country, containerView: 'order' });

    var orderObject = { order: orderModel };

    var emailObj = {
        to: order.customerEmail,
        subject: Resource.msg('subject.shipped_email', 'ocapi_shopOrder', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
        type: emailHelpers.emailTypes.orderConfirmation
    };

    emailHelpers.sendEmail(emailObj, 'shopOrder/confirmationShipmentEmail', orderObject);


var status = "OK";

}

function execute() {

   
    var Order = require('dw/order/Order');
    var OrderMgr = require("dw/order/OrderMgr");
    var Logger = require("dw/system/Logger");
    var server = require("server");

 

    var orders = OrderMgr.searchOrders('status!={0}', 'creationDate desc', Order.ORDER_STATUS_REPLACED);




       // var order = OrderMgr.getOrder(000005);

        while (orders.hasNext()) {

            var order = orders.next();
           
/*
    var ORDER_STATUS_CREATED = Order.ORDER_STATUS_CREATED;
    var ORDER_STATUS_NEW = Order.ORDER_STATUS_NEW;
    var ORDER_STATUS_OPEN = Order.ORDER_STATUS_OPEN;
    var SHIPPING_STATUS_SHIPPED = Order.SHIPPING_STATUS_SHIPPED;
    var PAYMENT_STATUS_PAID = Order.PAYMENT_STATUS_PAID;
    var ORDER_STATUS_CANCELLED = Order.ORDER_STATUS_CANCELLED;
*/
            

           // if(ORDER_STATUS_CREATED){
            mandarEmail(order);
           // }
/*
            if((ORDER_STATUS_NEW || ORDER_STATUS_OPEN) && PAYMENT_STATUS_PAID){
            mandarEmail2(order);
            }

            if((ORDER_STATUS_NEW || ORDER_STATUS_OPEN) && PAYMENT_STATUS_PAID && SHIPPING_STATUS_SHIPPED){
                mandarEmail3(order);
                }

            if(ORDER_STATUS_CANCELLED ){
                    mandarEmail4(order);
             }
*/
        }
    
            var status = "OK";

    
    return status;
    
}

module.exports = {
    execute: execute
};