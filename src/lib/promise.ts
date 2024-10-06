const prom = new Promise((resolve)=> setTimeout(() => {
    resolve(0)
}, 1000))

try {
    prom
    .then((res)=>console.log(res))
} catch (error) {}