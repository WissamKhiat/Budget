const CACHE='budget-v1';const ASSETS=['/','/index.html','/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
self.addEventListener('push',e=>{let d={title:'Budget Familial',body:'Alerte budget',icon:'/icon-192.png'};try{if(e.data)d={...d,...e.data.json()};}catch(x){}e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:d.icon,vibrate:[200,100,200],tag:'budget',renotify:true}));});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(cs=>{for(const c of cs){if('focus'in c)return c.focus();}if(clients.openWindow)return clients.openWindow('/');})  );});
