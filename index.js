// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

// MEN

// E - Express

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Project=require('./models/project.model')
const Company=require('./models/company.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors({
	origin: "*",
	})
  );
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Teamlogger1')

app.post('/member', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			empId:req.body.empId,
			email: req.body.email,
			contact:req.body.contact,
			country:req.body.country,
			timeZone:req.body.timeZone,
			designation:req.body.designation,
			password: newPassword
		})
		const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZ2VzaEBnbWFpbC5jb20iLCJpYXQiOjE2NDg2MjEwODJ9.YJurCJsNubcbe2s13WDV5-eyxx3MO7amOyv6VQkz-Yw"
		
		res.status(200).json({ status: 'ok', api_token:token })
	} catch (err) {
		res.status(400).json({ status: 'error', err})
	}
})
app.post('/project', async (req, res) => {
	console.log(req.body)
	try {
		await Project.create({
			projectName:req.body.projectName,
			projectId:req.body.projectId,
			domain:req.body.domain,
			projectLead:req.body.projectLead
			
		})
		const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZ2VzaEBnbWFpbC5jb20iLCJpYXQiOjE2NDg2MjEwODJ9.YJurCJsNubcbe2s13WDV5-eyxx3MO7amOyv6VQkz-Yw"
		
		res.status(200).json({ status: 'ok',api_token:token })
	} catch (err) {
		res.status(400).json({ status: 'error', err})
	}
})

app.post('/company', async (req, res) => {
	console.log(req.body)
	try {
		await Company.create({
			companyName:req.body.companyName,
			companyProject:req.body.companyProject,
			companyId:req.body.companyId,
			company:req.body.company
			
			
		})
		
		res.status(200).json({ status: 'ok' })
	} catch (err) {
		res.status(400).json({ status: 'error', err})
	}
})



app.post('/verify_token', async(req, res)=>{
	res.json({ status: 'ok' })
})

app.post('/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'v100-demo1-auth'
		)

		return res.status(200).json({ status: 'ok', user: token })
	} else {
		return res.status(400).json({ status: 'error', user: false })
	}
})




app.listen(8080, () => {
	console.log('Server started on 8080')
})
