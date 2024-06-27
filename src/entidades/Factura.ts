class Factura {
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    fechaFacturacion: string = '';
    mpPaymentId: number = 0;
    mpMerchantOrderId: number = 0;
    mpPreferenceId: string = '';
    mpPaymentType: string = '';
    formaPago: string = '';
    totalVenta: number = 0;
}

export default Factura;