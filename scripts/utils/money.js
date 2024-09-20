export function centsToActual(priceInCents){

    return ((Math.round(priceInCents)*0.01).toFixed(2));
    
}