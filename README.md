# Personal Finance Manager

Personal Finance Manager is an application with limited financing functionality, used for tracking your income and expenses and managing your money efficiently.

## The Assignment

The assignment you're about to tackle is a simple application, you'll be building from the current template built with **Create Remix App**.
This application might be small, but it's small for the purpose of helping you have more time over less work so you can focus on the project flexibily.
And more importantly, so you can work from as much perspective as you have, from UI/UX to Web best practices or [Remix.js](https://remix.run/docs/en/v1) Best practices and so on, **note**
that every detail might matter, every careful and subtle touches as well as bigger picture quality, re-usability, maintainability and accessibility thoughts
you put into the application helps us better understand your skills and your mental model of engineering in general and coding in particular.

Also **note** that, all story points with the label (`Will be implemented in future stories`), is put to express future plans of the whole application,
but don't worry, this is not for you, it's how stories in the real world applications and Development tracking systems will be written.

## Data

The application uses a simple data representation due to its limited functionality, and does not have a backend or API integrated. However, you are welcome to use your own backend or API if you prefer. Additionally, some pre-installed tools and mock data are available to help you develop your application.

## Best Practices

Following best practices is especially important because it helps us to ensure that the code is clean, maintainable, and efficient. Some examples of best practices in coding include:

  - Creating a clear and intuitive navigation structure.
  - Using clear and descriptive names for variables, functions, and other elements of code.
  - Using descriptive and meaningful variable and function names.
  - Structuring code in a logical and organized way.
  - while using version controll, keep you're commits simple, small, and clean.

## Design

You can find the Design for Personal Finance Manager in [this Figma file](https://www.figma.com/file/dJUAWU41JCpAPl0rRDGCx3/Money-Manager?node-id=0%3A1).  
**Note**: Try to preview the application with Figma Preview functionality and interact with links and buttons to see how they respond
to actions, but keep in mind, it's just a mock up, and real-world applications need more attention in terms of both design and functionality.

### Figma Preview example

![image](https://user-images.githubusercontent.com/41629832/154848791-107fea0d-f211-42d0-a5a7-646ca970d88d.png)

![image](https://user-images.githubusercontent.com/41629832/154848837-d53bf2fd-e721-4f78-8858-22d07cb36c43.png)


## Stories

### Sidebar & Topbar

- As a user, I want to see a sidebar in the left of the screen so I can easily navigate through the application.
  Each link representing a page in the application, when I'm on a specific page, I want it's link to be `white`
  
  When clicking on a link other than currently active link, user will be navigated to corresponding page.

  Sidebar contains two navigation links:
  1. Overview
  2. Transaction History

- As a user, I want the title of the page to appear in the topbar section of the application.

### Overview Page

- As a user, I want the application to open intially in the `overview` page.
- As a user, I want to see 3 cards in the top of `Overview` page of
  1. Incomes of this month.
  2. Current total Balance.
  3. expenses of this month.
- As a user, I want nothing to happen, when `Details` on overview cards clicked (`Will be implemented in future stories`)
- As a user, I want to see an overview of latest transactions of this week.
  - If there is no transaction in this week, I'd like to see transactions of the last month
  - if there is no transaction in the last month, I'd like to see transactions of this year
  - In any case, only last 10 transactions must be shown.
- As a user, I want nothing to happen, when a transaction card clicked (`Will be implemented in future stories`)
- As a user, I want to see `Add Transaction` button in the overview page so I can add more transactions.

#### Add Transaction

- As a user, I want to `Add Transaction` popup form to be opened, when `Add Transaction` button clicked in `Overview` page.
- As a user, I want to see these inputs on the `Add Transaction` popup form:
  1. `category` select: should contain categories that I want to choose from for my transaction
     - When `type` is `income` I want `category` select to contain: `Salary`, `Loan`, `Gift`
     - When `type` is `expense` I want `category` select to contain: `Tech`, `Food`, `Bills`, `Sports`, `Health`, `Cloths`
  2. `date` select: I want to be able to see a calendar to choose the date I made the transaction from.
     - Initially, it should contain today's date.
  3. `amount` input: number input with `min=0`, I want to see the `$` regardless of the input's value.
  4. `type` input: multiple radio buttons, one can be selected at a time, determining the transactions type.
  5. `note` input: I want to be able to write up to 350 characters as a note attached to the transaction.
- When `Dismiss` button clicked, the popup will be hidden and the state will be discarded.
- When `Add Transaction` button clicked: 
  - If one or more fields do not have acceptable values, each input will have an error message below it, showing a proper error message.
  - If the form is valid, then a transaction will be saved to the transactions list.

### Transaction History page

- As a user, I want the application to navigate to `Transaction History` page when `Transaction History` nav link clicked.
- As a user, I want see my transactions list in the chronological order.
- There should be only at most 10 transactions per page.
- If transactions are more than 10 after applying filters, the pagination should contain more than one item.
- As a user, I want to be able to see a Search bar, that can be used to filter transactions based on `note` and `price`.
- As a user, I want to be able to see a Multi Select input, containing both `expense` and `income` categories that I can select
  multiple items that the transactions will be filtered based on those selected categroies.
- As a user, I want to be able to see a Date input to select a `from` date to filter transactions from that date until now.
- As a user, I want to be able to see a Date input to select a `to` date to filter transactions until that date.
  - in `to` date input, future dates must be disabled.
- When clicking on `Clear` button on the filter bar, all filters except search bar will be resetted to their initial values.
- As a user, I want to see pagination on the screen so I can change pages of which transactions is shown. 
