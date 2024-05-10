export async function main(ns){
    while(true){
          if(ns.getServerMoneyAvailable(ns.args[0]) > 0){
              try{
                  Math.random() > 0.5 ? await ns.hack(ns.args[0]) : await ns.grow(ns.args[0]);
              }catch(err){
                  try{
                      await ns.weaken(ns.args[0]);
                  }catch(err){}
              }
          }else{
              ns.exit();
          }
    }
  }