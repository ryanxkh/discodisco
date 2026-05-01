# CASE STUDY — hydrow-wordpress-headless

Profile: headless-wordpress
Source: https://vercel.com/customers/hydrow

[Skip to content](https://vercel.com/customers/hydrow#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# How the at-home workout sensation, Hydrow, cut authoring times from weeks to minutes

[![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/6Sc9pep8vV4LPYAYHXCMy1/2a487506bae2ed94fed0c3758c8c073e/alice-alexandra-moore-128.jpg)\\
Alice Alexandra MooreSr. Content Engineer](https://twitter.com/tempoimmaterial)

![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/7kaAn7qOdBndOaV3E9CCiM/14f39a1807a85ecee07aa24114efcf4c/alli-pope-128.png)

Alli PopeDirector of Marketing Programs and Vercel Media

7 min read

Copy URL

Copied to clipboard!

Sep 11, 2023

Learn how this team succeeded in their mission to create the ultimate composable ecommerce workflow.

#### 3000%

Faster website updates

#### 50%

Improvement in Core Web Vitals

[Talk to an Expert](https://vercel.com/contact/sales)

In 2022, Hydrow, celebrated for its personal rowing machines and immersive workout content, was in search of a seamless digital experience for its users.

Shopify Liquid and WordPress offer robust capabilities, but Hydrow required more custom, dynamic content capabilities.

## [Link to heading](https://vercel.com/customers/hydrow\#the-problem:-limited-content-agility) The problem: Limited content agility

Having solidified their presence in the competitive ecommerce landscape, Hydrow now faced other digital challenges. Hydrow, along with their solutions partner [Wunderman Thompson](https://wtctna.wundermanthompson.com/) [Commerce & Technology](https://wtctna.wundermanthompson.com/), were intent on delivering an evolved digital experience internally and for their end users, encompassing real-time content updates, streamlined collaboration, and an unparalleled user interface.

### [Link to heading](https://vercel.com/customers/hydrow\#team-members-needed-their-independence) Team members needed their independence

The absence of integration in Hydrow's original setup introduced delays, making every content update or site change a drawn-out process that required development support.

The dream was simple yet ambitious: to create an ecosystem where content authors, designers, and marketers operated seamlessly. They aimed to:

- Offer their creative teams a flexible design system beyond the confinements of templating languages like Liquid, allowing for rapid idea development and implementation.

- Provide instant feedback mechanisms, enabling authors to see content modifications in realtime.

- Free developer time up from needing to constantly support authors in content development.

- Implement a one-and-done solution that wouldn’t need so much recurring inter-team support.


### [Link to heading](https://vercel.com/customers/hydrow\#the-company-needed-to-keep-its-customers) The company needed to keep its customers

In ecommerce, ​improvingthe speed of implementation by refactoring a tech stack can be double edged sword. Hydrow aspired to swiftness, but having worked diligently to achieve their ecommerce standing, they also recognized the stakes. Any system overhaul couldn't jeopardize what they'd built.

Hydrow needed to uphold fundamental tenets like SEO optimization, consistent brand representation, and top site speed. They needed to ensure site resilience, regardless of any alterations made by non-devs. While also creating a better developer **and** user experience without limiting creative freedom.

Ideally, team members should be able to quickly implement bigger ideas than what the Wordpress and Shopify solution allowed—all without breaking anything.

### [Link to heading](https://vercel.com/customers/hydrow\#hydrow-wanted-to-move-quickly-and-in-sync) Hydrow wanted to move quickly and in sync

Hydrow wasn't content with _matching_ industry benchmarks; they wanted to go beyond them. In order to do this they needed to enhance website load times, [lifting user conversion](https://web.dev/milliseconds-make-millions/) and elevating their position in search engine rankings, reduce build and content update timeframes, transfer numerous operational facets away from a developer-centric model.

In other words, Hydrow wanted to get to where they already were instantly upon migration and use the new headroom to push the boundaries of performance.

## [Link to heading](https://vercel.com/customers/hydrow\#the-solution:-moving-to-a-headless-architecture) The solution: moving to a headless architecture

In the highly competitive stakes of ecommerce, Hydrow remained laser focused on their tenets as they chose the best tools for increased agility, seamless DX and UX, and improved performance.

> “At Wunderman Thompson Commerce & Technology we chose Contentful along with Next.js and Vercel in order to leverage the tools' robust feature sets and provide Hydrow with a headless stack that was not only fast but extremely scalable.At Wunderman Thompson Commerce & Technology we chose Contentful along with Next.js and Vercel in order to leverage the tools' robust feature sets and provide Hydrow with a headless stack that was not only fast but extremely scalable.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6uYL9XmXJ1YYI5O1ppprK3/929b4ca8326a05455059f38a09c44195/image.png)
>
> **Robin Rogowski,** Senior Lead Software Engineer

### [Link to heading](https://vercel.com/customers/hydrow\#contentful-as-the-headless-cms) **Contentful as the headless CMS**

The team chose [Contentful](https://www.contentful.com/) as the headless CMS because it offers Hydrow numerous key benefits, starting with a straightforward content migration path away from Wordpress and Shopify. Additionally it is, highly scalable and extensible, provides creative design freedom beyond traditional templating, has a [managed integration with Vercel](https://vercel.com/integrations/contentful) and Next.js that developers would not have to upkeep on their own, and also has Webhooks to integrate directly with Next.js Incremental Static Regeneration (ISR) for realtime content updates.

[**Take the next step**\\
\\
Reach out to a Vercel expert to learn how you can improve your developer and user experience while increasing conversions every day of the year.\\
\\
Contact Sales](https://vercel.com/contact/sales)

### [Link to heading](https://vercel.com/customers/hydrow\#vercel's-managed-infrastructure) Vercel's managed infrastructure

Vercel's infrastructure is designed to provide a seamless and efficient hosting solution for its customers. The platform stores static assets, such as HTML, JavaScript, and CSS, on AWS S3, while non-static assets, such as Serverless Functions, are created and run on AWS Lambda. Vercel takes care of managing all these assets automatically, ensuring a hassle-free experience for its users. Additionally, Vercel operates a global edge network and cache that routes and caches requests to the relevant assets on AWS S3 or AWS Lambda, ensuring fast and reliable delivery of content to end-users.

### [Link to heading](https://vercel.com/customers/hydrow\#next.js-and-isr-for-better-dynamic-content) Next.js and ISR for better dynamic content

Next.js offers Hydrow a separate frontend architecture that can easily query Contentful data via APIs. This means that developers can hook up Contentful in the frontend code wherever needed, iterating on frontend features without entangling backend data processes.

Crucially, Next.js also provides [Incremental Static Regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration), which combines the best of static-site generation (SSG) and server side rendering (SSR) to optimize both build times and end-user content delivery:

- Because Contentful content is server-rendered, it does not have to be generated on build. This means that Hydrow can scale up dynamic content without affecting build times.

- The “static” part of ISR means that users visiting dynamic Contentful content on Hydrow’s website encounter cached static pages—the fastest possible page served on the web.


> “With Vercel, Next.js, and Contentful we finally have that feeling of: "it just works." We’ve totally transformed our content authoring experience.With Vercel, Next.js, and Contentful we finally have that feeling of: "it just works." We’ve totally transformed our content authoring experience.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/2i1ayQYyMYYyB4HTvJmGIY/8c11a38683512ec04ca61da194fd8348/image.png)
>
> **Reuben Kabel,** Senior Vice President of Engineering at Hydrow

Additionally, because [ISR inside of Next.js is so customizable](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration), Hydrow has been able to build their dream authoring system: when authors press publish in Contentful, the Contentful webhook tells the Next.js frontend to [re-cache the content by path](https://nextjs.org/docs/app/api-reference/functions/revalidatePath). Both authors and users can see content delivered in realtime.

Hydrow has also made some further tweaks to ensure that the Contentful webhook would only tell Next.js to revalidate content at the page level, to further improve performance.

### [Link to heading](https://vercel.com/customers/hydrow\#preview-environments-for-authors'-workflows) Preview Environments for authors' workflows

There was still a problem, though: how could authors see content updates in the CMS that weren’t yet published?

Vercel allows for unlimited deployment environments on paid plans, each with their own unique environment variables (`.env` files). This means that Hydrow could create a separate Preview Environment just for authors, away from the endless clutter of developers but also a step below their production environment, showing them their **unpublished** Contentful content changes in realtime.

> “Preview Deployments have allowed the members of the marketing and business teams to set up content updates and see how they will look in production without publishing the changes. The teams are now able to set up the next round of content updates a couple days in advance which in turn allows them to rapidly publish the changes when a promo or marketing campaign starts or ends.Preview Deployments have allowed the members of the marketing and business teams to set up content updates and see how they will look in production without publishing the changes. The teams are now able to set up the next round of content updates a couple days in advance which in turn allows them to rapidly publish the changes when a promo or marketing campaign starts or ends.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/2i1ayQYyMYYyB4HTvJmGIY/8c11a38683512ec04ca61da194fd8348/image.png)
>
> **Reuben Kabel,** Senior Vice President of Engineering at Hydrow

When combined with Vercel’s feature-rich collaboration tools, such as [per-deploy preview URLs](https://vercel.com/docs/deployments/preview-deployments) and [Figma-like commenting](https://vercel.com/docs/workflow-collaboration/comments), authors now have a complete publishing suite at their fingertips. No more guessing at how the content will look when they hit publish.

And no more constant reliance on developers.

### [Link to heading](https://vercel.com/customers/hydrow\#edge-middleware-for-a-personalized-experience-) **Edge Middleware for a personalized experience**

Vercel enables Hydrow to move away from managing their own hefty architecture. By harnessing Vercel’s Frontend Cloud, they achieved elastic scalability, especially during high-traffic scenarios. Vercel’s Edge Network, the most optimized for Next.js of any provider, serves their dynamic content instantly around the globe.

Furthermore, Vercel’s [Edge Middleware](https://vercel.com/docs/functions/edge-middleware)—code that executes **before** a user request is processed on the site—helps Hydrow to experiment deeply and make on-the-fly adjustments with their customer base.

Edge Middleware is an ecommerce game changer, since it allows companies like Hydrow to use the results of customer data to dynamically serve each customer the most personalized-to-them digital experience. Edge Middleware can also be used for [latency-free A/B testing](https://vercel.com/blog/zero-cls-experiments-nextjs-edge-config) to bring in more data about users.

[**Ready to go headless at the edge?**\\
\\
Talk to a Next.js expert about reshaping your team's workflow.\\
\\
Get in Touch](https://vercel.com/contact)

## [Link to heading](https://vercel.com/customers/hydrow\#the-wins:-a-complete-transformation--) The wins: A complete transformation

When it comes to driving change in the digital sphere, results speak louder than intentions. The transformative steps Hydrow undertook are a testament to that. Their migration from Wordpress and Shopify to Contentful, Next.js, and Vercel brought forth several wins:

**Peak web performance:** In an industry as competitive as ecommerce, performance metrics make or break a brand.

- Hydrow transformed their [Core Web Vitals](https://web.dev/vitals/), catapulting from the bottom 25% to the **top 25% of ecommerce sites**.

- Authoring time has been drastically cut, **from weeks to minutes**, mostly due to reduced cross-team dependencies.

- **Content updates became truly realtime.** Publishing became an “it just works” experience, and authors and customers both didn’t need to wait to visualize changes.

- Thanks to Edge Network caching ISR, **dynamic content delivery is as fast as static content**, resulting in a speed-focused experience for customers, who are guaranteed to receive the latest changes.


**Seamless collaboration:** The introduction of new tools paved the way for a more collaborative workspace.

- **Authors can focus solely on content creation** without worrying about the intricacies of the revalidation system.

- Teams can prepare content updates in advance, **previewing exactly how it will look in production**—on any device.

- **Developers have their time back to work on value-added features** instead of maintaining current infrastructure. Adding new types of content to existing revalidation is templated and simple to implement.

- Teams have the liberty to **test various layouts and experiments in a production-like environment**—all without the risk of actual production interference.


**Infrastructure stability:** From an engineering perspective, the transformations were no less significant.

- Hydrow now owns no physical architectural failure points of their own and can achieve

**incredibly elastic scalability, especially for high-volume events and traffic**.

- Edge Middleware allows Hydrow to **optimize their site for individual user profiles**, driving more revenue.

- ISR caching has made serving fast pages to users a process that requires fewer server resources, **driving down infrastructure costs**.

- **Build times are down significantly**, since they are no longer correlated to the amount of dynamic content served.


## [Link to heading](https://vercel.com/customers/hydrow\#the-future-is-bright) The future is bright

A headless Contentful and Next.js setup on Vercel fits right alongside Hydrow’s mission of moving seamlessly together as one.

With developers now having more freedom to concentrate on the codebase, and authors having a much clearer and more scalable workflow, Hydrow now has plenty of headroom to keep growing and quickly developing the kinds of ideas that got them here in the first place.

[**Want to add Vercel to your composable stack?**\\
\\
Talk to an expert to learn how you can get started with Vercel today.\\
\\
Get in Touch](https://vercel.com/contact/sales)

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)