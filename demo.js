(() => {
    let e,
        r = [],
        o = document.getElementById('logger'),
        n = {appId: '12132321', appKey: '0cbfd82c', serverType: 'sandbox'},
        t = {
            fields: {
                number: {element: '#card-number', placeholder: '信用卡號'},
                expirationDate: {element: '#card-expirationDate', placeholder: '有效期限 MM/YY'},
                ccv: {element: '#card-ccv', placeholder: '背面末三碼'},
            },
            styles: {
                normal: {width: '100%', height: '40px', color: 'orange', borderColor: '#DDDDDD'},
                focus: {color: 'pink', borderColor: 'green'},
                error: {color: '#FF5353', borderColor: '#FF5353'},
                success: {color: '#000000', borderColor: '#DDDDDD'},
            },
        },
        l = {
            fields: {ccv: {element: '#direct-ccv', placeholder: '背面末三碼'}},
            styles: {
                normal: {width: '100%', height: '60px', color: 'orange', borderColor: '#DDDDDD'},
                focus: {color: 'pink', borderColor: 'green'},
                error: {color: '#FF5353', borderColor: '#FF5353'},
                success: {color: '#000000', borderColor: '#DDDDDD'},
            },
        };
    function a(c) {
        r.length &&
            void 0 !== r[c] &&
            r.forEach((r, d) => {
                d === c
                    ? ((e = r),
                      e.classList.add('active'),
                      0 === c &&
                          (function () {
                              const r = e.querySelector('#appId');
                              r.value = n.appId;
                              const o = e.querySelector('#appKey');
                              (o.value = n.appKey), (e.querySelector('#serverType').value = n.serverType);
                              const c = e.querySelector('#setupField');
                              c.value = JSON.stringify(t, void 0, 6);
                              const d = e.querySelector('#setupCCVField');
                              (d.value = JSON.stringify(l, void 0, 6)),
                                  e.querySelector('#setupFieldBtn').addEventListener('click', (e) => {
                                      (n.appId = r.value),
                                          (n.appKey = o.value),
                                          window.Payments91APP.setupSDK(n.appId, n.appKey, n.serverType),
                                          (t = JSON.parse(c.value)),
                                          a(1);
                                  }),
                                  e.querySelector('#setupCCVBtn').addEventListener('click', (e) => {
                                      (n.appId = r.value),
                                          (n.appKey = o.value),
                                          window.Payments91APP.setupSDK(n.appId, n.appKey, n.serverType),
                                          (l = JSON.parse(d.value)),
                                          a(2);
                                  });
                          })(),
                      1 === c &&
                          (e.querySelector('#getTxnTokenBtn').addEventListener('click', (e) => {
                              window.Payments91APP.card.getTxnToken((e) => {
                                  o.innerHTML = JSON.stringify(e, null, 4);
                              });
                          }),
                          window.Payments91APP.card.setup(t),
                          window.Payments91APP.card.onUpdate((e) => {
                              o.innerHTML = JSON.stringify(e, null, 4);
                          })),
                      2 === c &&
                          (window.Payments91APP.ccv.setup(l),
                          window.Payments91APP.ccv.setCardBrand(
                              document.getElementById('cardBrand').value.toUpperCase()
                          ),
                          window.Payments91APP.ccv.onUpdate((e) => {
                              o.innerHTML = JSON.stringify(e, null, 4);
                          }),
                          e.querySelector('#getTxnLastTokenBtn').addEventListener('click', (e) => {
                              window.Payments91APP.ccv.getTxnLastToken((e) => {
                                  o.innerHTML = JSON.stringify(e, null, 4);
                              });
                          })))
                    : r.classList.remove('active');
            });
    }
    document.addEventListener('DOMContentLoaded', () => {
        [].forEach.call(document.querySelectorAll('.step'), (e) => {
            r.push(e);
        }),
            a(0);
    });
})();
//# sourceMappingURL=demo.js.map
