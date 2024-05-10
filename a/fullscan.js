var playerServers = ['home', 'Server1'];
var serverChecked = [];
var checkList = [];
/** @param {NS} ns **/
export async function main(ns) {
    await ServersScan(ns, 'home');
    await printArray(ns, serverChecked);
}
/** @param {NS} ns **/
async function ServersScan(ns, target) {
    var servers1 = await ns.scan(target);
    for (var server in servers1) {
        if (!checkList.includes(String(servers1[server]))) {
            checkList.push(String(servers1[server]));
        }
    }
    serverChecked.push(target);
    var flag = true;
    while (flag) {
        flag = false;
        for (var i = 0; i < checkList.length; i++) {
            var servers = await ns.scan(String(checkList[i]));
            if (!serverChecked.includes(String(checkList[i]))) {
                serverChecked.push(String(checkList[i]));
            }
            for (var server in servers) {
                if (!checkList.includes(servers[server])) {
                    checkList.push(servers[server]);
                }
            }
        }
    }
    // remove player servers from serverChecked
    for (var server in playerServers) {
        for (var i = 0; i < serverChecked.length; i++) {
            if (serverChecked == playerServers[server]) {
                serverChecked.splice(i, 1);
                i--;
            }
        }
    }
}
async function printArray(ns, serverList) {
	ns.clear("servers.txt");
	ns.write("servers.txt", String(serverList));
}