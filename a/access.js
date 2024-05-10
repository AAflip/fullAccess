export async function main(ns) {
	var targetList;
	var targets = [];
	if(ns.fileExists("fullscan.js")){
		ns.run("fullscan.js");
		await ns.sleep(500);
		targetList = String(ns.read("servers.txt"));
		targets = targetList.split(",");
	}else{
		ns.alert("You need to have the fullscan.js file, you can get this file at [link here]");
		ns.exit();
	}
	if(targets.length > 3){
		for(var i = 71; i < targets.length; ){
			targets.pop();
		}
	}
	ns.clear("hackables.txt");
	ns.clear("nonhackables.txt");
	ns.scriptKill("hackerMan.js", "home");
	for(var i = 0; i < targets.length; i++){
		var portsOpened = 0;
		if(ns.hasRootAccess(String(targets[i])) == false){
			switch(ns.getServerNumPortsRequired(targets[i])){
				case 1:
					if(ns.fileExists('brutessh.exe')){
						ns.brutessh(targets[i]);
						portsOpened = 1;
					}
					break;
				case 2:
					if(ns.fileExists('ftpcrack.exe')){
						ns.brutessh(targets[i]);
						ns.ftpcrack(targets[i]);
						portsOpened = 2;
					}
					break;
				case 3:
					if(ns.fileExists('relaysmtp.exe')){
						ns.brutessh(targets[i]);
						ns.ftpcrack(targets[i]);
						ns.relaysmtp(targets[i]);
						portsOpened = 3;
					}
					break;
				case 4:
					if(ns.fileExists('httpworm.exe')){
						ns.brutessh(targets[i]);
						ns.ftpcrack(targets[i]);
						ns.relaysmtp(targets[i]);
						ns.httpworm(targets[i]);
						portsOpened = 4;
					}
					break;
				case 5:
					if(ns.fileExists('sqlinject.exe')){
						ns.brutessh(targets[i]);
						ns.ftpcrack(targets[i]);
						ns.relaysmtp(targets[i]);
						ns.httpworm(targets[i]);
						ns.sqlinject(targets[i]);
						portsOpened = 5;
					}
					break;
			}
			if(ns.getServerNumPortsRequired(targets[i]) <= portsOpened){
				ns.nuke(targets[i]);
			}
		}
		if(ns.getServerRequiredHackingLevel(targets[i]) > ns.getHackingLevel()){
			ns.write("nonhackables.txt",targets[i]+" Lack Level\n");
		}else if(ns.getServerNumPortsRequired(targets[i]) > portsOpened){
			ns.write("nonhackables.txt",targets[i]+" Lack Port\n");
		}else{
			ns.write("hackables.txt",targets[i]+"\n");
			ns.run("hackerMan.js", 1, targets[i])
		}
	}
}