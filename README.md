# recruitTask102019

## Front-end recruitment task

In order to get the highest possible score, all of the following requirements should be completed. Candidates are allowed to use any technology which they consider most suitable. Try to use the best UX/UI practices, feel free in design conception. Good luck!

* Add an input field for a country name, which should work only for Poland, Germany, Spain and France. It should have an autocomplete.
* Fetch (and render) names of 10 most polluted cities in those countries (based on input value) from https://docs.openaq.org/.
* Show cities descriptions as an accordion based on the data from Wikipedia API: https://www.mediawiki.org/wiki/API:Query.
* Make the input field value persistent between page reloads.

## Bugs

* Brak obsługi błędów przy pobieraniu danych z wiki, przy wyborze kraju - PL brak wyników z powodu braku danych w docs.openaq.org.
* Początkowo próba oparcia się na nazwie miasta, ostatecznie korzystanie z długości i szerokości geograficznej, z powodu nieścisłości danych. 
* Konieczność zrobienia oddzielnego fetch() dla polski - opieracjacego sie na nazwie miasta z API docs.openaq.org, w wczesniejszych commitach prawidło pobierane dane w ten sposób dla Polski, jednak dla pozostałych krajów błędy spowodowane złymi nazwami miast, bądź jak w przypadku Niemiec w wielu przypadkach zamiast nazwy miasta wprowadzone imię i nazwisko (prawdopodobnie osoby odpowiedzialnej za dane), z tej racji przejście w ostatniej chwili na korzystanie z długości i szerokości geograficznej.
