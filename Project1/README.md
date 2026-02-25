# Visualization Project 1 - Internet and Happiness

The motivation behind this project was to examine the relationship between mental health and internet availability across the world. I hypothesized it could allow viewers to analyze how the way we use the internet affects us, however, upon completion, I feel it better shows the role strong infrastructure (like internet or communications services) plays in raising global happiness.

### Data Used
- [Share of the population using the internet](https://ourworldindata.org/grapher/share-of-individuals-using-the-internet?country=WB_SA~WB_NA~WB_SSA~WB_EAP)
  - Anyone who accessed the internet in the last 3 months via phone, computer, etc.
- [People who report having friends or relatives they can count on](https://ourworldindata.org/grapher/people-who-report-having-friends-or-relatives-they-can-count-on)
  - People who reported having friends or relatives they could rely on in "times of trouble"
  - Measured from 2014-2016
  - Distinctly smaller dataset and consistently high, but still holds some variation
- [Self-reported life satisfaction](https://ourworldindata.org/grapher/happiness-cantril-ladder)
  - Participants asked to rank their happiness on a scale from 0 - 10 (Cantril Ladder)

*All datasets provided by Our World In Data*

### Visualization Components

#### Choropleth Map Comparisons
<img width="1734" height="918" alt="image" src="https://github.com/user-attachments/assets/542b0dd4-56f3-478f-bb23-efa6ea0f6f23" />
Darker shaded areas indicate a higher value. 

#### Scatterplot
<img height="400" alt="image" src="https://github.com/user-attachments/assets/821c8202-d2e2-465b-af63-ed478e918c69" />

Compares its two labeled axes.

#### Bar Chart
<img width="2124" height="908" alt="image" src="https://github.com/user-attachments/assets/8b9d3fbb-30d4-40e6-af61-e43fa6d2925c" />

Countries to value, sorted from greatest. Can be scrolled along the x-axis if the chart overflows.

#### UI Interaction
<img width="588" height="130" alt="image" src="https://github.com/user-attachments/assets/706d8a12-4301-40fb-bf9a-196a38bc50f7" />

Users can click the corresponding button to compare data on internet usage against either friends and relatives trustworthiness or life satisfaction score.

The respective view is unhidden while the other view is hidden.

### Discoveries
<img height="400" alt="image" src="https://github.com/user-attachments/assets/821c8202-d2e2-465b-af63-ed478e918c69" />

While the dataset isn't as large as it could be, the scatterplot comparison between the share of the population using the internet and the % of people who report having friends or relatives they can rely on seems to have a slight upward trend.

<img height="400" alt="image" src="https://github.com/user-attachments/assets/fd2d9f22-7dde-416b-a4cf-a7863f91c427" />

Additionally, despite the y-axis scale being horribly wrong by a factor of 10, there is still a visible upward trend in life satisfaction scores increasing given a higher internet usage percentage.

I felt as if this was unintuitive: people who had more access to the internet were satisically happier, a narrative that opposes what we are typically told. However, the correlation may be related to a more reasonable underlying trend, like general infrastructure. A country who can support widespread internet access most likely supports other helpful services that keep people positive.

The correlation between more internet access and a higher ability to rely on friends or family seems less likely to be drawn from this "internet access means better infrastructure in general" theory, as the relationships are interpersonal and should be able to exist regardless of public or private services.

<img height="400" alt="image" src="https://github.com/user-attachments/assets/07a1bc57-99c2-4b0f-85db-60391a36eda7" />

The choropleth maps give some useful data as well, like showing how low internet access is for parts of Africa, India, and Oceania.

### Development Process
I used D3 and Bootstrap to create this project. The project is functionally driven. The general layout is constructed in HTML, then HTML Elements are selected from the DOM and manipulated.

- [Code Repository](https://github.com/castonln/Visual-Interfaces-Data/tree/main/Project1)

- [Live Demo](https://castonln.github.io/Visual-Interfaces-Data/Project1/)

### Challenges and Future Work
This project was a struggle between projects in other electives and my senior design project work. It is by no means a finished product. Despite its currently weak presentation, I am genuniely interested in the underlying data and may return to this to improve it for a possible entry on a resume. For future projects, I aim to work in even smaller chunks and try to at least get a quater to half hour of programming in every day until the due date.

For the future, I'd like to improve the page's UI and interaction. I'd of course like to add tooltips and country selection. I'd like to improve the secondary view for happiness scores to include the original choropleth map for internet usage to be displayed alongside. I'd like to differ the color schemes on the choropleths and add their scales in clear terms in the corners of their divs.

I'd also like to add another comparison to some sort of infrastructure or GDP dataset to see how correlated each of the other datasets are to that one. That or have a comparison of all three, perhaps another scatterplot where dot sizes are marked by the third attribute. This could lead to new conclusions and maybe answer some of the questions or theories I mentioned I had about the data.

### AI Usage and Collaboration

I used a the references at [D3 Graph Gallery](https://d3-graph-gallery.com/) to help build the charts.

During development, I used Microsoft Copilot to answer questions about debugging or D3's documentation. My typical process included feeding it my HTML and JS code along with a prompt describing what I thought the error was and the error code delivered to the browser in the Developer Console.

### Demo
