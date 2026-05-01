# CASE STUDY — shotgun-traffic-spikes

Profile: other
Source: https://vercel.com/customers/managing-major-traffic-spikes-during-ticket-drops-with-vercel

[Skip to content](https://vercel.com/customers/managing-major-traffic-spikes-during-ticket-drops-with-vercel#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# Managing major traffic spikes during ticket drops with Vercel

![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/HDbeKSjtxa6NJUdPxafd0/74ae04ff7ff246bd22a573f0575ad283/kiana-lewis-128.jpg)

Kiana LewisCopywriter

3 min read

Copy URL

Copied to clipboard!

Mar 31, 2023

Managing the complex scaling needs of an online ticketing platform can be challenging. For the French end-to-end ticketing solution [Shotgun](https://shotgun.live/), ticket drops used to involve stress around scaling and server provisioning. As a company dedicated to providing artists and their fans with the _best_ service, Shotgun now relies on Vercel for seamless launches. So when they drop tickets for artists like Billie Eilish, the team can rest assured their site can handle the traffic.

## [Link to heading](https://vercel.com/customers/managing-major-traffic-spikes-during-ticket-drops-with-vercel\#the-need-for-scalability) **The need for scalability**

In the beginning, Shotgun’s small dev team relied on Heroku. They appreciated its setup simplicity, but soon realized that Heroku couldn’t always scale to handle the traffic their website receives. It’s not uncommon for Shotgun’s consumer site to experience extreme traffic spikes when tickets go live for an event—jumping by 200x in just a few minutes. To prevent site crashes, Shotgun’s engineers would need to manually scale before ticket drops.

The switch to Vercel took the pressure off of Shotgun’s developers. Instead of manually scaling ahead of time, they can now count on Vercel’s serverless autoscaling during traffic spikes. By using Vercel as their frontend platform and Next.js for their consumer website and dashboard, the team can feel confident during major ticket launches.

> “Vercel allows us to focus on innovating and building our products, rather than spending time on DevOps.Vercel allows us to focus on innovating and building our products, rather than spending time on DevOps.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/3TEE8K1HQWoCDcKJVIqAnl/ff275051d99aed313589bb4d5992dbe1/image.png)
>
> **Lucas Gerard,** Cofounder and CTO at Shotgun

## [Link to heading](https://vercel.com/customers/managing-major-traffic-spikes-during-ticket-drops-with-vercel\#a-better-workflow-for-faster-development) **A better workflow for faster development**

A crucial part of Shotgun's deployment workflow is the use of deployment branches that Vercel automatically provisions upon each \`git commit\`. Opening a pull request generates a corresponding Vercel Preview Deployment, which the team uses for testing, staging, and ultimately deployment to production. It’s a simple and familiar workflow.

[The team at Shotgun](https://shotgun.teamtailor.com/jobs) has improved the rest of their dev workflow, too. They use [Edge Config](https://vercel.com/blog/edge-config-public-beta) to quickly configure new waiting rooms in preparation for ticket drops. This prevents them from having to deploy each time a new waiting room is needed. When combined with [Vercel Instant Rollbacks](https://vercel.com/docs/concepts/deployments/instant-rollback) and [Edge Functions](https://vercel.com/features/edge-functions), Shotgun’s new workflow has given them more time to iterate at scale. As Lucas explains, “Using Vercel has made us more confident in serving larger and larger clients. Vercel has really unlocked that scalability for us.”

## [Link to heading](https://vercel.com/customers/managing-major-traffic-spikes-during-ticket-drops-with-vercel\#simplifying-their-setup) **Simplifying their setup**

With its accessibility for small and large companies alike, Shotgun can experience the many Vercel features developers love. One example: [Vercel Cron Jobs](https://vercel.com/blog/cron-jobs). Migrating from Shotgun’s previous Firebase function to Cron was seamless—taking just five minutes. On a macro level, the team enjoys how intuitive using Vercel has been. They don’t have to fight with the UI or struggle to find what they’re looking for. Everything just works.

> “Vercel is incredibly easy to use due to its great UX and UI. We can really tell that it’s been made by developers, for developers.Vercel is incredibly easy to use due to its great UX and UI. We can really tell that it’s been made by developers, for developers.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7jjbKJATENPyWD2b2te02e/3dd9085a65ae3e30072aae0743aab9fe/image.png)
>
> **Antoine Rousseau,** Senior Software Engineer

## [Link to heading](https://vercel.com/customers/managing-major-traffic-spikes-during-ticket-drops-with-vercel\#next-up,-the-us-and-brazil:-expanding-to-other-markets) **Next up, the US and Brazil: expanding to other markets**

While the team is based in Europe, they have a large user base growing in the United States and in Brazil that they’re looking forward to expanding. Features like [Edge Middleware](https://vercel.com/features/edge-functions) and Vercel’s [Real Experience Score](https://vercel.com/analytics) are helping Shotgun confidently grow that user base. They rely on Edge Middleware to fine-tune cookie handling, and they can see the impact of site updates in real time on actual users with [Vercel Analytics](https://vercel.com/analytics). Being able to track their site and app performance in these specific countries helps them better optimize for these new markets.

From Brazil to France, consumers around the world can continue encountering seamless buying experiences when they’re shopping with Shotgun. Next.js is the main framework for the startup’s site and dashboard. After recently upgrading their consumer site to Next.js 13 on React 18, the dev team experienced even more performance gains.

[**Ready to scale at the edge?**\\
\\
Talk to an expert about improving your own site's performance. \\
\\
Get in touch](https://vercel.com/contact)

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)