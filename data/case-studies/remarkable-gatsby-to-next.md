# CASE STUDY — remarkable-gatsby-to-next

Profile: custom-spa-migration
Source: https://vercel.com/blog/incrementally-adopting-next-js-at-one-of-europes-fastest-growing-brands

Your Privacy

This site uses tracking technologies. You may opt in or opt out of the use of these technologies.

Essential
On

Essential cookies and services are used to enable core website features, such as ensuring the security of the website.

* * *

Marketing
Off

Marketing cookies and services are used to deliver personalized advertisements, promotions, and offers. These technologies enable targeted advertising and marketing campaigns by collecting information about users' interests, preferences, and online activities.

* * *

Analytics
Off

Analytics cookies and services are used for collecting statistical information about how visitors interact with a website. These technologies provide insights into website usage, visitor behavior, and site performance to understand and improve the site and enhance user experience.

* * *

Functional
Off

Functional cookies and services are used to offer enhanced and personalized functionalities. These technologies provide additional features and improved user experiences, such as remembering your language preferences, font sizes, region selections, and customized layouts. Opting out of these cookies may render certain services or functionality of the website unavailable.

SaveDenyAccept all

[Privacy Policy](https://vercel.com/legal/privacy-policy)

Your Privacy

This site uses tracking technologies. You may opt in or opt out of the use of these technologies.

DenyAccept all

Consent Settings

[Privacy Policy](https://vercel.com/legal/privacy-policy)

 [Skip to content](https://vercel.com/blog/incrementally-adopting-next-js-at-one-of-europes-fastest-growing-brands#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# Incrementally adopting Next.js at one of Europe's fastest growing brands

![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/HDbeKSjtxa6NJUdPxafd0/74ae04ff7ff246bd22a573f0575ad283/kiana-lewis-128.jpg)

Kiana LewisCopywriter

3 min read

Copy URL

Copied to clipboard!

Jun 23, 2023

Learn how reMarkable's tech stack allows them to improve their developer experience while also delivering great UX.

#### 87%

Decrease in build times

[Talk to an Expert](https://vercel.com/contact/sales)

# Products Used

Next.js

Preview Deployments

ISR

Integrations

While [reMarkable](https://remarkable.com/), pioneers of the next-generation paper tablet, can credit much of their initial success to their original website, they knew they’d need to improve key elements of their stack and workflow to reach new heights. The team opted for a composable stack—comprised of [Sanity](https://vercel.com/integrations/sanity), Next.js, and Vercel—to meet the needs of their developers while empowering their content creators to deliver truly delightful digital experiences.

## [Link to heading](https://vercel.com/blog/incrementally-adopting-next-js-at-one-of-europes-fastest-growing-brands\#the-case-for-headless:-empowering-every-team-to-create) **The case for headless: empowering every team to create**

reMarkable’s developers were excited to benefit from the flexibility and power of a modern composable architecture. After migrating from Gatsby, Vercel and [Sanity](https://vercel.com/integrations/sanity) allowed reMarkable to speed up build times with a faster frontend stack. The improvements to their web team’s development experience allowed them to ship faster and more efficiently.

### [Link to heading](https://vercel.com/blog/incrementally-adopting-next-js-at-one-of-europes-fastest-growing-brands\#streamlined-review-cycles) **Streamlined review cycles**

The design team had always used Figma to display new site designs for stakeholders to review. However, the static, Figma mockup is just a fragment of what the team wanted to show. [Vercel Preview Deployments](https://vercel.com/features/previews) helped speed up review cycles, facilitate more stakeholder feedback, and really show what reMarkable’s team can do. While they still use Figma, Previews paired with instant content updates from Sanity give them a whole other dimension to showcase ideas and get buy-in.

> “Preview comments have been a great tool for us to collaborate. It’s been an easy way for us to push changes. We can tell stakeholders: Just log in and comment straight on the solution. Preview comments have been a great tool for us to collaborate. It’s been an easy way for us to push changes. We can tell stakeholders: Just log in and comment straight on the solution. Preview comments have been a great tool for us to collaborate. It’s been an easy way for us to push changes. We can tell stakeholders: Just log in and comment straight on the solution. ”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/77EV6nol7DkV5drKH8xxqJ/e2d50eac9b69b765eed3e378e680b423/image.png)
>
> **Kristi Faye-Lund,** Full Stack Developer at reMarkable

### [Link to heading](https://vercel.com/blog/incrementally-adopting-next-js-at-one-of-europes-fastest-growing-brands\#self-sufficient-editorial-team) **Self-sufficient editorial team**

If reMarkable’s editorial team wanted to make certain website changes in the past, they’d need the help of developers and designers. As reMarkable Full-Stack Developer Kristi shares, "We didn't want to have so many dependencies in the process. We wanted our content people to actually be able to work on _content—_ not wait for a developer." With Sanity as part of their composable architecture, content creators can create as many custom landing pages as they need on their own. This allows their entire organization to move faster, with less tech debt.

### [Link to heading](https://vercel.com/blog/incrementally-adopting-next-js-at-one-of-europes-fastest-growing-brands\#faster-builds-for-faster-ships) **Faster builds for faster ships**

Development builds were slow to start in the beginning, and at times, reMarkable’s engineers would have to start them multiple times to get them going. After switching to Vercel, the initial startup time of development builds dropped. John, full-stack developer at reMarkable, explains, “This was a dramatic change that improved the lives of all our developers. It makes working on projects much more pleasant.” Production times improved as well through Next.js—going from **5m 55s** to just **39s**.

### [Link to heading](https://vercel.com/blog/incrementally-adopting-next-js-at-one-of-europes-fastest-growing-brands\#de-risking-headless-transition-with-an-incremental-migration-) **De-risking headless transition with an incremental migration**

reMarkable’s developers chose to incrementally migrate from Gatsby to Next.js and Sanity so they could ensure a smooth, manageable transition. First, they modified their website’s structure as much as possible to prepare for the change, moving to a pages folder and lifting the datafetching to the pages-level. They then started their development in a separate branch, with rewriting the queries as the main bulk of work. Once that chunk of work was done, they swapped in the new framework, and onboarded the rest of the development team. This allowed them to move to a new stack, in place, only changing hosting and a few other parameters on the outside. No long living branches or new repos needed.

Going forward, reMarkable’s team is excited to continue future-proofing their content structure. They’re ready to achieve new levels of success with their freshly-empowered editorial team, and the eCommerce brand is eager to continue making strides with their agile composable stack.

[**Ready to redefine your digital experiences with Vercel?**\\
\\
If you're curious about how Vercel can uplift your team's specific use case, our experts are ready for a conversation.\\
\\
Let's Talk](https://vercel.com/contact/sales)

## Explore

[Blog post\\
\\
Jan 13, 2023\\
\\
**Sanity balances experimentation and performance with Vercel Edge Middleware** \\
\\
![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/5VABKa23ORaoMqsn8yAUI7/30d398910489f6a673a11b47555c1440/grace-madlinger-128.jpg)\\
\\
Grace Madlinger](https://vercel.com/blog/sanity-edge-middleware) [Vercel Template\\
\\
Deploy this template\\
\\
**A clean Next.js + Sanity starter with visual editing, drag-and-drop page builder, live content updates, and AI-powered media support.** \\
\\
Sanity + Next.js Clean App](https://vercel.com/templates/next.js/sanity-next-js-clean-app)

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)