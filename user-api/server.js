require("dotenv").config();

const express = require("express");
const cors = require("cors");

const passport = require("passport");
const passportJWT = require("passport-jwt");

const jwt = require("jsonwebtoken");

const userService = require("./modules/user-service");


const app = express();


const PORT = process.env.PORT || 8081;


// middleware

app.use(express.json());

app.use(
    cors({
        origin:[
            "http://localhost:3000",
            "https://smart-reads-saam.vercel.app"
        ],
        methods:[
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        credentials:true
    })
);
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Passport JWT setup

const ExtractJwt = passportJWT.ExtractJwt;

const JwtStrategy = passportJWT.Strategy;


const jwtOptions = {

    jwtFromRequest:
        ExtractJwt.fromAuthHeaderWithScheme("jwt"),

    secretOrKey:
        process.env.JWT_SECRET

};



passport.use(
    new JwtStrategy(
        jwtOptions,
        async (jwt_payload, done)=>{
            
            try{

               const user =
                   await userService.getUserByUserName(
                       jwt_payload.userName
                );

                done(null,user);


            }catch(err){

                done(null,false);

            }

        }
    )
);


app.use(passport.initialize());



// initialize database

userService.initialize()
.then(()=>{

    console.log("MongoDB connected");

})
.catch((err)=>{

    console.error(
        "MongoDB connection error:",
        err.message
    );

});



// TEST ROUTE

app.get("/",(req,res)=>{

    res.json({
        message:"User API running"
    });

});



// REGISTER

app.post("/api/user/register",
async(req,res)=>{

    try{

        await userService.registerUser(
            req.body.userName,
            req.body.password,
            req.body.password2
        );


        res.status(200).json({
            message:"User registered"
        });


    }catch(err){

        res.status(422).json({
            message:err.message
        });

    }

});




// LOGIN

app.post("/api/user/login",
async(req,res)=>{

    try{


       const user =
           await userService.checkUser(
               req.body.userName,
               req.body.password
        );


        const payload = {

            _id:user._id,

            userName:user.userName

        };


        const token =
            jwt.sign(
                payload,
                process.env.JWT_SECRET
            );


        res.json({

            message:{
                token:token
            }

        });


    }catch(err){


        res.status(422).json({

            message:err.message

        });


    }

});




// PROTECTED FAVOURITES ROUTES


app.get(
"/api/user/favourites",

passport.authenticate("jwt",{session:false}),

async(req,res)=>{
    

    try{


        const favourites =
            await userService.getFavourites(
                req.user.userName
            );


        res.json(favourites);


    }catch(err){

        res.status(422).json({
            message:err.message
        });

    }


});




app.put(
"/api/user/favourites/:id",

passport.authenticate("jwt",{session:false}),

async(req,res)=>{


    try{


        const favourites =
            await userService.addFavourite(
                req.user.userName,
                req.params.id
            );


        res.json(favourites);


    }catch(err){

        res.status(422).json({
            message:err.message
        });

    }


});




app.delete(
"/api/user/favourites/:id",

passport.authenticate("jwt",{session:false}),

async(req,res)=>{


    try{


        const favourites =
            await userService.removeFavourite(
                req.user.userName,
                req.params.id
            );


        res.json(favourites);


    }catch(err){

        res.status(422).json({
            message:err.message
        });

    }


});





if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

module.exports = app;