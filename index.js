'use strict';

const { networkInterfaces } = require('os');
const express = require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());

const projects={};
const localIP=(()=>{
	const results = Object.values(networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==='IPv4' && !i.internal && i.address || []), [])), []);
	const ip=results.find(f=>f.startsWith('192.168.'));
	if(ip) return ip;
	else return results.length ? results[results.length-1] : null;
})()

const port = 8888;

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if(req.method=='OPTIONS') res.end();
    else next();
});

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html');
});

app.get('/:project',(req,res)=>{
	const val=projects[req.params.project];
	if(val){
		res.json(val);
		projects[req.params.project] = null;
	}else if(val === null){
		res.json({ idle: true });
	}else{
		res.status(404).end();
	}
})
app.post('/:project',(req,res)=>{
	projects[req.params.project]=req.body;
	res.status(200).end();
});

app.patch('/ip',(req,res)=>{
	res.json({ip: `http://${localIP}:${port}`});
})

app.listen(port,()=>{
	console.log('Lat-Long-Sim is live at http://localhost:'+port);
	if(localIP) console.log('Lat-Long-Sim is live at http://'+localIP+':'+port);
});