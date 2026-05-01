# CASE STUDY — sonos-devex

Profile: enterprise-commerce
Source: https://vercel.com/customers/how-sonos-amplified-their-devex

[Skip to content](https://vercel.com/customers/how-sonos-amplified-their-devex#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# Developing at the speed of sound: How Sonos amplified their DevEx

[![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/6ThxRLzcizCqHz4dJqiuuM/b3212371b5bb6cf6a2d1b3c198127fcc/greta-workman-128.jpg)\\
Greta WorkmanDirector, Product Marketing](https://twitter.com/gretaworkman)

3 min read

Copy URL

Copied to clipboard!

Aug 17, 2023

Learn how Sonos improved build times, saved developer time, and optimized their digital presence by migrating to Next.js and Vercel.

#### 75%

Improvement in build times

#### 10%

Improvement in performance scores

[Talk to an Expert](https://vercel.com/contact/sales)

# Products Used

Next.js

Routing Middleware

Monitoring

Comments

Preview Deployments

Web Analytics

ISR

As the world’s leading sound experience company with a 20-year legacy of innovation and over 3,000 patents, [Sonos](https://www.sonos.com/) understands the importance of a robust digital presence that reflects the brand’s cutting-edge ethos.

However, for years, the high costs and slow builds of their web infrastructure hindered developers from making critical site updates. The solution: a transition to a headless, composable architecture using Vercel and Next.js.

The switch resulted in a remarkable 75% improvement in build times, empowering developers to innovate with ease and confidence.

> “It’s just a pity we didn’t go sooner. Next.js and Vercel make our developers happier, make us go to market quicker, and let us move with confidence. It’s just a pity we didn’t go sooner. Next.js and Vercel make our developers happier, make us go to market quicker, and let us move with confidence. ”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7mlje7mNxEK4jvgqWKu507/bc064f44b3a0fc67695e354003fb3d1c/image.png)
>
> **Jonathan Lemon,** Software Engineering Manager at Sonos

## [Link to heading](https://vercel.com/customers/how-sonos-amplified-their-devex\#going-headless-with-next.js) Going headless with Next.js

When Sonos' Brand team envisioned a fresh take on their website, developers recognized that relying solely on Salesforce Commerce Cloud would be too constraining and limit their ability to maintain performance. The team needed more frontend flexibility to express the brand's vision while optimizing for SEO and performance metrics.

> “Next.js really suits the ecommerce world; it gives you the flexibility to build on the server or the client, to choose how you want to build. It's a really great fit, and when you tie in a CMS like Sanity, they go hand-in-hand.Next.js really suits the ecommerce world; it gives you the flexibility to build on the server or the client, to choose how you want to build. It's a really great fit, and when you tie in a CMS like Sanity, they go hand-in-hand.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7mlje7mNxEK4jvgqWKu507/bc064f44b3a0fc67695e354003fb3d1c/image.png)
>
> **Jonathan Lemon,** Software Engineering Manager at Sonos

Switching to open-source Next.js as a part of their headless solution also allowed the team to fully migrate while avoiding lock-in with a single service provider. This would prove crucial in Sonos’ journey.

## [Link to heading](https://vercel.com/customers/how-sonos-amplified-their-devex\#removing-friction-for-better-dx) Removing friction for better DX

Initially, the team attempted to build a CI/CD, global edge, and caching system to self-host their refactored Next.js application. However, after creating a proof-of-concept in AWS, they realized this would be more of a time and maintenance commitment than they were willing to make.

Their previous solution led to several points of friction, including:

- **Build Times:** The team was experiencing 20 minute builds for each environment. This meant for every preview, and then again for every production build, each developer hit friction points

- **Next.js Support:** The previous solution did not support Next.js 12 or 13 at the time of migration, which meant the team couldn’t adopt new features like [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware). Features like [Incremental Static Regeneration](https://vercel.com/docs/concepts/incremental-static-regeneration) (ISR) were also not supported, forcing the team to hand-roll their own infrastructure

- **Cache Management:** Issues with cache busting between preview and production led to recurring 307 (temporary redirect) errors, due to constant rebuilding of pages in AWS CloudFront

- **Observability and Debugging:** Debugging and [monitoring](https://vercel.com/docs/concepts/observability/monitoring) was a constant struggle for the team, as information was spread across multiple products


> “We were wasting the equivalent of an entire year's worth of a developer’s time chasing down and fixing the constant errors.We were wasting the equivalent of an entire year's worth of a developer’s time chasing down and fixing the constant errors.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7mlje7mNxEK4jvgqWKu507/bc064f44b3a0fc67695e354003fb3d1c/image.png)
>
> **Jonathan Lemon,** Software Engineering Manager at Sonos

## [Link to heading](https://vercel.com/customers/how-sonos-amplified-their-devex\#incremental-migration-to-vercel) **Incremental migration to Vercel**

Sonos needed a more complete and unified Frontend Cloud experience with better [monorepo](https://vercel.com/docs/concepts/monorepos) support, to enable their developers to move faster. So, they looked to the platform that created and develops Next.js.

> “We needed a quality product for a quality product. We evaluated other options, but really Vercel was a no-brainer. We wanted to make sure we didn’t cut any corners.We needed a quality product for a quality product. We evaluated other options, but really Vercel was a no-brainer. We wanted to make sure we didn’t cut any corners.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7mlje7mNxEK4jvgqWKu507/bc064f44b3a0fc67695e354003fb3d1c/image.png)
>
> **Jonathan Lemon,** Software Engineering Manager at Sonos

In the next three months, Sonos migrated over ten properties to Vercel, including their main homepage, subscription pages, helpsheets, and product guides. The migration was seamless, and the team quickly saw the benefits of Vercel [Preview Deployments](https://vercel.com/features/previews).

![Sonos' migration path (from top-left to bottom-right) ended with 75% faster build times on a feature-complete Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7CAidgw0tkZDNDABf7xlou%2Fadbe7c999238c968cb0084e5398a9cfe%2FInline_Graphic-Light.png&w=1920&q=75)![Sonos' migration path (from top-left to bottom-right) ended with 75% faster build times on a feature-complete Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5o0DtUs2MLyuLHxU833f5j%2F9bde897b356d15d38f7aca9cb1de5278%2FInline_Graphic-Dark.png&w=1920&q=75)Sonos' migration path (from top-left to bottom-right) ended with 75% faster build times on a feature-complete Vercel.

> “Once we got the GitHub connection set up, all we needed to do was move the environment variables over and cut over the DNS. We were able to use Preview Deployments to see it all working—it was all really straightforward. Even on launch day it just worked great. We all got on the call, we switched over, and it was done.Once we got the GitHub connection set up, all we needed to do was move the environment variables over and cut over the DNS. We were able to use Preview Deployments to see it all working—it was all really straightforward. Even on launch day it just worked great. We all got on the call, we switched over, and it was done.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7mlje7mNxEK4jvgqWKu507/bc064f44b3a0fc67695e354003fb3d1c/image.png)
>
> **Jonathan Lemon,** Software Engineering Manager at Sonos

Vercel’s Frontend Cloud enabled Sonos to move faster, bringing **20-minute builds to just five**. Sonos also experienced a quicker onboarding of contractors and teams, and a faster feedback loop, leveraging Vercel’s collaborative Preview Deployments for every git commit.

The team also found themselves with better observability into the site, using Vercel’s built-in logs and [Web Analytics](https://vercel.com/docs/concepts/analytics) to chart a **10% lift in performance and a bump up in mobile Lighthouse scores to 90**.

Perhaps most importantly, the team’s load testing on Vercel showed no issues, and the site was able to handle the huge influx of users that came for the holidays without dipping in performance.

[**Explore Vercel Enterprise**\\
\\
See Vercel in action with a product tour, trial, or a personalized demo.\\
\\
Explore the Product](https://vercel.com/try-enterprise)

## [Link to heading](https://vercel.com/customers/how-sonos-amplified-their-devex\#black-friday-and-beyond) **Black Friday and beyond**

With the migration complete, Sonos entered the high-traffic holiday season, including the critical Black Friday period, with newfound confidence. Vercel's platform provided the stability and scalability they needed to ensure a seamless experience for their customers.

> “It's great being able to track our performance and logs; that is huge. I love seeing all the data, and being able to query on my logs. We had a nightmare time trying to find logs before because our previous solution was just a front for a ton of other products. It's great being able to track our performance and logs; that is huge. I love seeing all the data, and being able to query on my logs. We had a nightmare time trying to find logs before because our previous solution was just a front for a ton of other products. ”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7mlje7mNxEK4jvgqWKu507/bc064f44b3a0fc67695e354003fb3d1c/image.png)
>
> **Jonathan Lemon,** Software Engineering Manager at Sonos

The enhanced development workflow, enabled by Vercel's preview environment and PR flow, has created a collaborative and efficient environment for the team. Developers can validate their changes in a deployed environment, and reviewers can easily access preview builds during code reviews. This new process has led to **higher quality code and faster time to market**.

> “Day to day, you get your preview builds; you're immediately able to see if it works in a deployed environment. The team has confidence that if it works in their preview build, it's going to work in production. It's just made PRs and development flow easier, better, more reliable.Day to day, you get your preview builds; you're immediately able to see if it works in a deployed environment. The team has confidence that if it works in their preview build, it's going to work in production. It's just made PRs and development flow easier, better, more reliable.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/7mlje7mNxEK4jvgqWKu507/bc064f44b3a0fc67695e354003fb3d1c/image.png)
>
> **Jonathan Lemon,** Software Engineering Manager at Sonos

Sonos' migration to Vercel has unlocked new levels of innovation, efficiency, and confidence for the company. The powerful combination of Next.js and Vercel has enabled Sonos to fully express their brand vision, optimize their digital presence, and deliver an outstanding experience to their customers.

Reflecting on the journey, the sentiment within the team is clear: the move to Vercel was the right choice, and the only regret is not making the switch sooner. With Vercel as their development platform, Sonos is poised to continue leading the audio technology industry and delivering exceptional products to their customers around the world.

[**Start building securely**\\
\\
Our experts can help you navigate Vercel for your team's unique needs.\\
\\
Contact Us](https://vercel.com/contact/sales)

## Explore

[Blog post\\
\\
Feb 23, 2023\\
\\
**The Next.js SEO Playbook: Ranking higher with Next.js on Vercel** \\
\\
![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/6Sc9pep8vV4LPYAYHXCMy1/2a487506bae2ed94fed0c3758c8c073e/alice-alexandra-moore-128.jpg)![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/250i2dmPyymAjaxC7IodMz/3219d159196e5566101ddadec4b0cf0b/thom-crowe-128.jpg)\\
\\
Alice and Thom](https://vercel.com/customers/nextjs-seo-playbook) [Vercel.com landing page\\
\\
**Learn more about Vercel Preview Deployments**](https://vercel.com/features/previews)

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)