# HOOD Framework

An open-source framework built on the Mattermost collaboration platform to enable deictic, data-driven discussions via the Hyperlinked Object-Oriented Discussion (HOOD) approach.

## Use Cases

- [CS-CONNECT](https://github.com/tizianocitro/cs-aware-next-cs-connect): open-source collaboration platform built with HOOD for the Horizon Europe CS-AWARE-NEXT project, which aims to improve the cybersecurity management and collaboration capabilities of organizations and local or regional supply networks.
- [Climate Change](https://github.com/tizianocitro/climate-change): open-source collaboration platform created with HOOD to identify Information Disorder in climate change discussions.
- [E4C](https://github.com/tizianocitro/hood-framework/tree/main/e4c): collaboration platform created with HOOD to discuss and collaborate on energy consumption data for making decisions on how to improve energy efficiency.
- [Alliances](https://github.com/tizianocitro/hood-framework/tree/main/alliances): open-source collaboration platform created with HOOD to discuss European University Alliances.

Other implementations are available in dedicated directories within this repository.

## Papers

### The Idea

The main idea behind the HOOD framework is described in the following papers:

- [Are Claims Grounded in Data? An Empowering Linking Approach for Misalignment Identification in Online Data-Driven Discussions](https://doi.org/10.1109/ACCESS.2024.3511039).
    ```bibtex
    @ARTICLE{AreClaimsGroundedInData2024,
        author = {Citro, Tiziano and Pellegrino, Maria Angela and Spagnuolo, Carmine},
        journal = {IEEE Access}, 
        title = {Are Claims Grounded in Data? An Empowering Linking Approach for Misalignment Identification in Online Data-Driven Discussions}, 
        year = {2024},
        volume = {12},
        pages = {182045-182061},
        keywords = {Data visualization;Visualization;Hypertext systems;Switches;Layout;Data models;Bars;Visual databases;Soft sensors;Object oriented modeling;Data-driven discussions;data visualization;deixis;linking;misalignment;user study;within-subjects design},
        doi = {10.1109/ACCESS.2024.3511039},
        url = {https://doi.org/10.1109/ACCESS.2024.3511039}
    }
    ```
- [As a Grain of Link: How Far Should We Take Link Granularity](https://doi.org/10.1145/3648188.3675146).
    ```bibtex
    @inproceedings{AsAGrainOfLink2024,
        author = {Citro, Tiziano and Pellegrino, Maria Angela and Scarano, Vittorio and Spagnuolo, Carmine},
        title = {As a Grain of Link: How Far Should We Take Link Granularity},
        year = {2024},
        isbn = {9798400705953},
        publisher = {Association for Computing Machinery},
        address = {New York, NY, USA},
        url = {https://doi.org/10.1145/3648188.3675146},
        doi = {10.1145/3648188.3675146},
        abstract = {Individuals can leverage data referencing in collective scenarios, akin to deixis, a common human interaction in which they can physically point to relevant information. While deixis is easily performed in online synchronous interactions, e.g., mouse pointing during screen sharing in video conferences, reproducing it in asynchronous online interactions is not trivial. A significant step towards finer mimicking in-person co-presence is enhancing the granularity of links to data, enabling users to reference specific pieces of data in their content. This paper reviews 43 digital platforms in 8 sub-categories, organized in 3 main categories, and proposes requirements, opportunities, and challenges of link granularity for asynchronous online interactions.},
        booktitle = {Proceedings of the 35th ACM Conference on Hypertext and Social Media},
        pages = {223–229},
        numpages = {7},
        keywords = {Comparison, Digital Platforms, Link granularity, Online Co-presence},
        location = {Poznan, Poland},
        series = {HT '24}
    }
    ```

The reasons why Mattermost was chosen as the base platform for the HOOD framework are described in the paper [On the Road of Data-driven Discussion: a Comparison of Open-source Collaboration Platforms](https://ceur-ws.org/Vol-3574/paper_4.pdf).

```bibtex
@inproceedings{OnTheRoadOfDataDrivenDiscussion2023,
    title = {On the Road of Data-driven Discussion: a Comparison of Open-source Collaboration Platforms},
    author = {Andriessen, Jerry and Citro, Tiziano and Schaberreiter, Thomas and Serra, Luigi},
    year = {2023}, 
    booktitle = {Proceedings of the 1st Sustainable, Secure, and Smart Collaboration (S3C) Workshop, in conjunction with CHITALY 2023 - Biannual Conference of the Italian SIGCHI Chapter},
    url = {https://ceur-ws.org/Vol-3574/paper\_4.pdf}
}
```

### The applications

Other papers presenting the different contexts in which the HOOD framework has been applied:
- [Facilitating co-referencing data visualisations on an online platform](https://dl.acm.org/doi/full/10.1145/3746175.3746212).
    ```bibtex
    @inproceedings{FacilitatingCoreferencingDataVisualisation2025,
      author = {Safin, St\'{e}phane and Tarasenka, Dziyana and Baker, Michael and D\'{e}tienne, Fran\c{c}oise and Citro, Tiziano and Pellegrino, Maria Angela and Spagnuolo, Carmine and Scarano, Vittorio},
      title = {Facilitating co-referencing data visualisations on an online platform},
      year = {2025},
      isbn = {9798400720338},
      publisher = {Association for Computing Machinery},
      address = {New York, NY, USA},
      url = {https://doi.org/10.1145/3746175.3746212},
      doi = {10.1145/3746175.3746212},
      abstract = {In order to enhance quality of decisions and conflict resolution, knowledge-based dialogues need to be grounded in objective visualised data. However, co-referencing visualisations of relevant data is difficult in online platforms, given that pointing to specific aspects, avoiding lengthy verbal descriptions, may be problematic. We describe a preliminary study of the use of the HOOD platform, designed specifically for online data-driven dialogues, in the context of a case study on optimising energy consumption. We propose a methodology for understanding and describing the mobilisation of data in dialogic activity by end-users. Qualitative analysis of dialogues and referencing of data visualisations revealed different patterns of exploration of multiple visualisations, showing this to be the key issue.},
      booktitle = {Proceedings of the 36th Annual Conference of the European Association of Cognitive Ergonomics},
      articleno = {44},
      numpages = {5},
      keywords = {Data pointing, Data-driven dialog, Online dialog},
      location = {Rennes, France},
      series = {ECCE '25}
    }
    ```
- [Ground your Statement in Data! A Hands-on Activity to Meet European University Alliances](https://dl.acm.org/doi/full/10.1145/3750069.3755964).
    ```bibtex
    @inproceedings{GroundStatementInData2025,
      author = {Citro, Tiziano and Pellegrino, Maria Angela},
      title = {Ground your Statement in Data! A Hands-on Activity to Meet European University Alliances},
      year = {2025},
      isbn = {9798400721021},
      publisher = {Association for Computing Machinery},
      address = {New York, NY, USA},
      url = {https://doi.org/10.1145/3750069.3755964},
      doi = {10.1145/3750069.3755964},
      abstract = {European University Alliances aim to foster collaboration and innovation across higher education, yet remain largely unknown to high school learners. This paper introduces an educational activity using Open Data and a technology-enhanced platform, HOOD, to raise awareness among 21 high school learners. Through interactive visualizations and collaborative tools, learners verified statements about the European University Alliances using real data. Results show strong engagement and improved understanding, though deeper retention may require extended exposure.},
      booktitle = {Proceedings of the 16th Biannual Conference of the Italian SIGCHI Chapter},
      articleno = {104},
      numpages = {3},
      keywords = {European University Alliances, Data-driven Discussions, Data Visualization, Engagement, Learning, Open Data, High School},
      location = {Bari, Italy},
      series = {CHItaly '25}
    }
    ```
- [Increasing Cybersecurity Awareness and Collaboration in Organisations and Local/Regional Networks: The CS-AWARE-NEXT Project](https://ceur-ws.org/Vol-3574/paper\_5.pdf).
    ```bibtex
    @inproceedings{IncreasingCybersecurityAwareness2023,
        author = {Christian Luidold and Thomas Schaberreiter and Christian Wieser and Adamantios Koumpis and Cinzia Cappiello and Tiziano Citro and Jerry Andriessen and Juha R{\"{o}}ning},
        title = {Increasing Cybersecurity Awareness and Collaboration in Organisations and Local / Regional Networks: The {CS-AWARE-NEXT} Project},
        booktitle = {Proceedings of the 1st Sustainable, Secure, and Smart Collaboration Workshop in conjunction with {CHITALY} 2023 - Biannual Conference of the Italian {SIGCHI} Chapter, },
        series = {{CEUR} Workshop Proceedings},
        volume = {3574},
        pages = {46--72},
        publisher = {CEUR-WS.org},
        year = {2023},
        url = {https://ceur-ws.org/Vol-3574/paper\_5.pdf},
        location = {Turin, Italy}
    }
    ```
