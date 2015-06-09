How to use the news widget
----------------------------
[Demo link](http://ankwiz.com/newsfeed/)

Demo page showcase follwoing things 

* How multiple templates are used to display same content
* How to pass various configurations
* Scalablity of widget by adding multiple widgets on same page
* Responsiveness in demo 5


Try it yourself
---------------
I am assuming that you have all **git, npm and grunt** setup on your machine. 

Clone a copy of the news widget git repo by running:

```
git clone https://github.com/wendywy0660/newswidget.git
```

Enter the project directory:

```
cd yourdirectory
```
run

```
npm install
```
and set up in develop mode by running

```
grunt serve
```

or run the build script

```
grunt build
```

The built version will be put in the `dist/` subdirectory, along with the minified copy and associated map file.


#### Overview


##### How to use?
Include this on your page :

* Include CSS and javascript for the Widget
* Add empty DIV like : &lt;div class="demo-3"></div&gt;
* Add Java script to invoke newsbox : 

``` 
$('.demo-3').newsBox(); 

```

For more options refer to demo for inline documatation

##### Directory strucutre
Directory names are self explanatory so just covering important files

* /templates  : contains UI templates
* /resources : contains local copy of JSON data
* /script :
	* Widget.js : Contain the all logic to pick right template, comiple and render html using handlerbar.js
	* WidgetFactory.js : For picking the right instance based on type of template like list, card etc
	* NewsService.js : Data source adaptor
	* newsBox.js : For configuration managemnt for widget based on jquery plugin style. Also defines the public interface for using the widget
* /styles : Based on bootstrap and less css for cutomisation
* /images :  defualt created based on framework. Not required for us as of now. 



##### Add new template
Its simple :)
You can copy exisiting template and update it.  

* make sure you have unique name with naming convesions based on widget functinality like 'list-xmas, list-media .. '
* Save it under templates folder
* By default click events will open the detailed story
* Once this is runnin

##### Customisation

Basic templates just allow to skin differently however for more advance things. I have framework which allows to change behaviour like : 

* When you click on the news item, it overlays the details on the item itself
* Sometime you might want to track the click event for analytics etc
* For reference look into CardWidget for details



