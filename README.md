# $filTeX$

> By **NUSH Team 0**:
>
> - Khang
> - Yuan Xi
> - Edden
> - Prannaya
> - Yu Pin
> - Yaw Tia
>
> Made for NTU Deep Learning Week Hackathon 2022
>
> 30<sup>th</sup> September 2022 to 3<sup>rd</sup> October 2022

## Details

### Inspiration

With the impending rise of the metaverse, and with social media and more permeating modern culture in a way never before seen, children have become more likely to interact with others on the internet. Due to hyperstimulation, kids are more likely to venture into using technologies like Roblox and Youtube, and that leads to rampant problems in their health and their ability to focus.

Although Roblox appears to be a harmless game where kids can use their creativity, there is also a lot of adult content inside the game that is inappropriate for children. In addition, such platforms are unable to cater to the necessary content moderation and filtration needed to protect our children, as we enter a smart and digital nation. Scamming is also a common phenomenon on the internet, [according to this Straits Times article from March 2022](https://www.straitstimes.com/singapore/more-children-cheated-in-game-scams-counsellors-urge-peer-support-and-parental-supervision), which makes it even more dangerous since children may be urged to click on such links and could experience guilt for having done that soon after. [According to this post from Today.com](https://www.today.com/parents/7-year-old-girl-s-avatar-assaulted-while-playing-roblox-t132531), an individual was essentially **assaulted** in this platform, and the only reason what that there was no proper content moderation. Hence, it is incredibly crucial that we provide a utility to parents and children for an additional layer of well-needed safety before such content reaches them.

### What is our Project?

$filTeX$ is a content moderations that comes in two similar but very distinct parts, a [chrome extension](https://github.com/terminalai/filtex/tree/main/dev/extension), and an [online virtual chat room](https://filtex.surge.sh/). In both platforms, $filTeX$ uses a combination of **Computer Vision** and **Natural Language Processing** related models in a multi-modal format to detect a variety of different types of inappropriate content, from general profanities, to inappropriate ASCII art, to simply too mature sentences. Such content is marked via a spoiler by the AI, allowing us to be protected from the text unless we are ultimately willing to do so.

### How we built it

#### AI

##### Profanity Detection

Similar to the problem once identified for spam classification problems, we must be able to account for the slight variations in wording, wherein often pages can be clouded with numerous incorrect spellings of the profanities intended, which don't get removed from the pages. `f0ck` instead of `f***` is a common example. While most utilities simply permute these combinations, we have decided to use a novel AI framework to do this. Via Python's `pillow` library, we convert each word into a separate image, which we pass through a very tiny CNN model in order to determine it's closeness to any one of the closed set of profanities we have compiled as a list. This AI model is able to perform simple similarity detection algorithms, although it is still susceptible to specific spellings, like `fu0k`, failing to register as similar. In addition, it can sometimes detect texts which are not meant as profanities, such as `singapore` and `pofma`, and simply classify it as a vulgarity. In such cases, an automatic bypass database has been created which looks up specific texts and whitelists them.

##### _Sus_picious ASCII Art Detection



##### Semantic Detection

Last but certainly not least, we have developed an NLP model to identify such problematic texts and which uses sequential sentence classification to remove such texts. Due to the smaller amount of data, we have instead used two datasets:

- [`OpenAI's Moderation API Dataset (1690 Records)`](https://github.com/openai/moderation-api-release)<br> We have used OpenAI's Moderation API as a basis for labelling, as we feel that this task requires a larger range of potential classifications. The Moderation API effectively provides the following scores, as computed by their own AI:<br><table>
  <thead>
  <tr>
  <th>Category</th>
  <th>Label</th>
  <th>Definition</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>sexual</td>
  <td><code>S</code></td>
  <td>Content meant to arouse sexual excitement, such as the description of sexual activity, or that promotes sexual services (excluding sex education and wellness).</td>
  </tr>
  <tr>
  <td>hate</td>
  <td><code>H</code></td>
  <td>Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste.</td>
  </tr>
  <tr>
  <td>violence</td>
  <td><code>V</code></td>
  <td>Content that promotes or glorifies violence or celebrates the suffering or humiliation of others.</td>
  </tr>
  <tr>
  <td>harassment</td>
  <td><code>HR</code></td>
  <td>Content that may be used to torment or annoy individuals in real life, or make harassment more likely to occur.</td>
  </tr>
  <tr>
  <td>self-harm</td>
  <td><code>SH</code></td>
  <td>Content that promotes, encourages, or depicts acts of self-harm, such as suicide, cutting, and eating disorders.</td>
  </tr>
  <tr>
  <td>sexual/minors</td>
  <td><code>S3</code></td>
  <td>Sexual content that includes an individual who is under 18 years old.</td>
  </tr>
  <tr>
  <td>hate/threatening</td>
  <td><code>H2</code></td>
  <td>Hateful content that also includes violence or serious harm towards the targeted group.</td>
  </tr>
  <tr>
  <td>violence/graphic</td>
  <td><code>V2</code></td>
  <td>Violent content that depicts death, violence, or serious physical injury in extreme graphic detail.</td>
  </tr>
  </tbody>
  </table>
- [`Profanity Check's Combined Binary Classification Dataset (20k records)`](https://raw.githubusercontent.com/vzhou842/profanity-check/master/profanity_check/data/clean_data.csv)<br>This Dataset only contains binary labels of Profanity detection, but we utilise it as a larger unlabelled data source with some confirmation for pseudolabels.


We then create a simplistic "Teacher" model, a small Bidirectional LSTM as trained via TensorFlow on Kaggle's Notebook feature. This is a small model which uses the advantage of using the smaller first data sample to train over a small period of time. After this, we pseudolabel the second dataset and verify the results. Following this, with $> 20\text{ k}$


#### Deliverables

##### Chrome Extension

The $filTeX$ [Chrome Extension](https://github.com/terminalai/filtex/tree/main/dev/extension) uses general-purpose HTML/CSS/JS, but it also advances on such technologies by using API commands to a dedicated Flask server deployed on Anaconda's openly available `PythonAnywhere` utility, allowing us to openly interface with the AI models trained.

##### Virtual Chat Room

The $filTeX$ [Chat Room](https://filtex.surge.sh/), on the other hand, uses the React web framework, developed via TypeScript, with Firebase's Realtime Database (RTDB) functionality (which in itself uses sockets for network connections) to store messages in specific chat room. The rooms are slowly evaulated based off messages and results from the aforementioned Flask Server, ensuring it is able to sustain for longer periods of time. The app has been deployed via the open-source `Surge.sh` functionality, as per the domain.

## Hackathon Details

### Theme

**AI and Smart Nation**

> _"Develop AI models or IoT solutions that solve industrial or social problems in the new stage of society development. The Smart Nation is an initiative by the Government of Singapore to harness from info-comm tech, networks and big data to create tech-enabled solutions."_

## Schedule

Submission:

- Day 4, 6am
- 3 Deliverables (slides 8 slides MAX but not to use in round 2, Max 30s demo video, Source Code on GH MOST IMPORTANT) on Devpost

Round 1: (announced on 9am)

- 30 Teams selected
- 5 min demo from 9am to 1.30pm

Round 2: (announced at 2pm)

- 15 teams selected
- 4 min prez (2 - 5.30pm)
- 6 min Q&As

6pm: Award Ceremony

## Rubrics

40% Technical Difficulty (Execution, Task Difficulty)

30% Industrial Value (Feasibility, Budget Cost, Community Impact, Business Value)

20% Innovation (Idea)

10% Project Delivery (Prez, Readability, UI/UX)

## Tech

### GPU Access

- One Slot of 6 Hours per Team, need to fill in form online
- go to MLDA Map at **S2.1-B4-01** in **EEE buildings, Handbook provides**

### Other Electronics

- We get to keep it if we use it!😄

## Proposed AI Model

## Tasks

(Mostly should be tracked in [Issues](https://github.com/terminalai/dlw-hack/issues))

- [ ] Set up Chat Room [Webpage](filtex.surge.sh)
- [ ] Set up Chrome Extension
- [ ] Set up Flask Server
- [ ] Set up Jetpack Compose App
