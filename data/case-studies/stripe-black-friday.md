# CASE STUDY — stripe-black-friday

Profile: fintech
Source: https://vercel.com/customers/architecting-reliability-stripes-black-friday-site

[Skip to content](https://vercel.com/customers/architecting-reliability-stripes-black-friday-site#geist-skip-nav)

[Blog](https://vercel.com/blog)/[Customers](https://vercel.com/blog/category/customers)

# Architecting a live look at reliability: Stripe's viral Black Friday site

[![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_40,h_40,q_75/contentful/image/e5382hct74si/6ThxRLzcizCqHz4dJqiuuM/b3212371b5bb6cf6a2d1b3c198127fcc/greta-workman-128.jpg)\\
Greta WorkmanDirector, Product Marketing](https://twitter.com/gretaworkman)

3 min read

Copy URL

Copied to clipboard!

Jan 16, 2024

How Stripe built and optimized the first-ever detailed look into their core business using Vercel.

#### 17M+

Edge requests at launch

#### 100%

Uptime

[Talk to an Expert](https://vercel.com/contact/sales)

In 2023, businesses processed more than $18.6 billion on Stripe over Black Friday and Cyber Monday (BFCM).

This year, just 19 days before Black Friday, Stripe asked a question: "What if?" What if they opened up Stripe's core metrics and gave a detailed look into their core business, reliability, and the reach of their products?

In response, employees from across the company came together to construct a real-time, publicly accessible microsite that dynamically showcased Stripe's reliability, transaction volumes, global activity, and more, during BFCM—and they showcased it all on Vercel.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3FyXqbUFBXncuqebI8AVXs%2F6f3e0511f637b148784105a695a56468%2Fbfcm-dashboard-compressed.gif&w=1920&q=75)

By leaning on Vercel's framework-defined infrastructure, the Stripe team was able to focus on design, performance, and reliability rather than on architecting a dynamic cache system from scratch in 19 days.

Stripe built a live experience in record time, allowing viewers to see never-before-seen real-time transaction data. By harnessing Vercel's robust infrastructure and cutting-edge technologies like Next.js, SWR, and ISR, the result was a flawlessly performing microsite.

> “This would not have been possible without Vercel. Certainly not within 19 days.This would not have been possible without Vercel. Certainly not within 19 days.”
>
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/45N31XLoiupCuuWqCu7uQ5/d4244129165e6e11c6f251281e9237e4/sammacalisterstripe.jpeg)
>
> **Sam McAllister,** Stripe

## [Link to heading](https://vercel.com/customers/architecting-reliability-stripes-black-friday-site\#optimizing-for-the-unique-challenges-of-a-viral-real-time-microsite) Optimizing for the unique challenges of a viral real-time microsite

Stripe needed to strike a balance between a fast initial page load and responsive user interactions while effectively managing the application's dynamic components.

At first, they considered a per-client WebSocket approach to handle the real-time updates. However, given the tight timelines and the expected load, they opted for a solution of polling a backend cache while frequently rehydrating that cache—SWR facilitated real-time interactions on the client side, while ISR ensured that dynamic content updates occurred without directly querying the backend for every request.

**Let's break it down further:**

- [**getStaticProps (gSP)**](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) **:** Fetched static data during build time, ensuring that the essential data required for the initial page load is pre-fetched and rendered.

- [**Stale-While-Revalidate (SWR)**](https://vercel.com/docs/edge-network/headers?__vercel_draft=1#stale-while-revalidate) **:** Managed the real-time data and interactions on the _client_ side, allowing the application to display the latest data to users while simultaneously triggering a background revalidation process. This ensured that the data remained up-to-date without causing excessive load on the backend.

- [**Incremental Static Regeneration (ISR)**](https://vercel.com/docs/incremental-static-regeneration) **:** Automated revalidation of the static content from gSP and SWR, propagated and seeded throughout the entire Vercel Edge Network automatically.


Stripe chose a one-second max-age cache, enabling the application to deliver static pages with minimal backend queries, ensuring the system's capability to efficiently handle millions of requests during peak times by updating content in the background while users accessed static pages.

[**Framework-defined infrastructure**\\
\\
Understand the basis for Vercel's framework-defined infrastructure that turns your code into globally-provisioned cloud application.\\
\\
Learn more](https://vercel.com/blog/framework-defined-infrastructure)

This combined strategy effectively decreased the backend load by redirecting traffic to Vercel's cache network and utilizing ISR for background data generation. The result was a seamless user experience, enabling the real-time update of the counter without sacrificing overall performance.

![Screenshot of part of Stripe's microsite, taken on Black Friday GMT afternoon.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6Gc2hbTvGdRdYkxEjua5Kx%2F880d293ec6d7aae628c14470a4ab94dd%2FScreenshot_taken_on_Black_Friday_GMT_afternoon.png&w=1920&q=75)Screenshot of part of Stripe's microsite, taken on Black Friday GMT afternoon.

## [Link to heading](https://vercel.com/customers/architecting-reliability-stripes-black-friday-site\#ensuring-reliability-and-uncompromising-safety) Ensuring reliability and uncompromising safety

Stripe is known for their unwavering dedication to their infrastructure's [reliability](https://twitter.com/dps/status/1597698676872613888). Across BFCM, Stripe handled a peak volume of 93,304 transactions per minute, while maintaining API uptime greater than 99.999%. This campaign had to not only showcase that reliability but also operate with the strictest of security measures to ensure no risk entered into the Stripe ecosystem.

**Everything isolated: API-first approach to securing the core business**

First, the team ensured complete isolation of the microsite’s data sources from core Stripe infrastructure. This deliberate separation served as a safeguard, guaranteeing that even in the face of any issues, any impact would be confined to an isolated endpoint.

**Fallback Strategy: Navigating the Unknown**

In the realm of real-time data streaming, where novel metrics were being presented for the first time, the team acknowledged the need for a robust fallback strategy. Should a metric fail to update or cease to provide results, meticulous planning was put in place to detect and mitigate those scenarios.

By teaming up with Vercel, Stripe's innovative BFCM microsite provided a unique, live insight into Stripe's operational reliability, showcasing an impressive handling of high transaction volumes while ensuring exceptional API uptime. In 19 days, the rapid and successful execution of this project not only emphasizes Stripe's role as a leader in innovation, but also establishes a new benchmark for efficiency in the fintech sector.

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

[Start Deploying](https://vercel.com/new) [Talk to an Expert](https://vercel.com/contact/sales)

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.

[Explore Enterprise](https://vercel.com/try-enterprise)