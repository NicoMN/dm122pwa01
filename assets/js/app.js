'use strict'

if('serviceWorker' in navigator) {
    const onSuccess = () => console.log('[Sevice Worker] Registered');
    const onFailure = () => console.log('[Sevice Worker] Failed');

    navigator.serviceWorker.register('sw.js')
    .then(onSuccess)
    .catch(onFailure) 
}