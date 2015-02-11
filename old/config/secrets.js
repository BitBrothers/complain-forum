/**
 * IMPORTANT * IMPORTANT * IMPORTANT * IMPORTANT * IMPORTANT * IMPORTANT *
 *
 * You should never commit this file to a public repository on GitHub!
 * All public code on GitHub can be searched, that means anyone can see your
 * uploaded secrets.js file.
 *
 * I did it for your convenience using "throw away" credentials so that
 * all features could work out of the box.
 *
 * Untrack secrets.js before pushing your code to public GitHub repository:
 *
 * git rm --cached config/secrets.js
 *
 * If you have already commited this file to GitHub with your keys, then
 * refer to https://help.github.com/articles/remove-sensitive-data
*/

module.exports = {

  db: process.env.MONGODB|| 'mongodb://codejedi:sobin123@kahana.mongohq.com:10028/codejedi_co',

      sessionSecret: process.env.SESSION_SECRET || 'CodejediGameStarts',

      mailgun: {
        user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
        password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
      },
      
      mandrill: {
        user: process.env.MANDRILL_USER || 'sobingt@gmail.com',
        password: process.env.MANDRILL_PASSWORD || '5_d9MTWZJMHpa2e4pq2Keg'
      },

      linkedin: {
        clientID: process.env.LINKEDIN_ID || 'mx25madp23gd',
        clientSecret: process.env.LINKEDIN_SECRET || 'V0sdjR7zHaZi9hT8',
        callbackURL: '/auth/linkedin/callback',
        scope: ['r_fullprofile', 'r_emailaddress', 'r_network'],
        passReqToCallback: true
      },
      github: {
        clientID: process.env.GITHUB_ID || '073a2f230cb522f2b799',
        clientSecret: process.env.GITHUB_SECRET || 'b1afce31da37660f95ef8be74e6ba992278afd63',
        callbackURL: '/auth/github/callback',
        passReqToCallback: true
      },

      facebook: {
        clientID: process.env.FACEBOOK_ID || '779129992098375',
        clientSecret: process.env.FACEBOOK_SECRET || 'fc5a36cb1fa441c60b629ee6bc65bc85',
        callbackURL: '/auth/facebook/callback',
        passReqToCallback: true
      },
    google: {
        clientID: process.env.GOOGLE_ID || '351938692508-8pcqec0ajptfnlbi6o2mjpan2ot6i9fc.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET || 'aWLgQC4Bo4EUMfGgEMKoLArX',
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
      },
  twitter: {
    consumerKey: process.env.TWITTER_KEY || '6NNBDyJ2TavL407A3lWxPFKBI',
    consumerSecret: process.env.TWITTER_SECRET  || 'ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa',
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },
      linkedin: {
        clientID: process.env.LINKEDIN_ID || '77chexmowru601',
        clientSecret: process.env.LINKEDIN_SECRET || 'szdC8lN2s2SuMSy8',
        callbackURL: '/auth/linkedin/callback',
        scope: ['r_fullprofile', 'r_emailaddress', 'r_network'],
        passReqToCallback: true
      },
     
        amazon: {
        accessKeyId: "AKIAIWHGTAKSSBVVQPUQ", 
        secretAccessKey: "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", 
        region: "us-east-1"
        }
};