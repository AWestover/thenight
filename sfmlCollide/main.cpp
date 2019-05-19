
/*
 * AUTHOR: Alek Westover
 * PROGRAM: main.cpp  
*/

#include <SFML/Graphics.hpp>
#include <SFML/Audio.hpp>

#include <iostream>
#include <fstream>
#include <time.h>
#include <math.h>

int main() {
	srand(time(NULL));

	// initialize window variables 
	sf::Vector2f screenDimensions(1024, 512);
	bool paused = false;
	bool showMap = true;
	bool showStats = true;
	sf::RenderWindow window;
	window.create(sf::VideoMode(screenDimensions.x, screenDimensions.y), "thenight");
	window.setFramerateLimit(60);

	// views
	sf::View view(sf::Vector2f(screenDimensions.x/2, screenDimensions.y/2), screenDimensions); // center location, size
	view.setViewport(sf::FloatRect(0.0f,0.0f,1.0f,1.0f));

	sf::CircleShape indicator;
	indicator.setRadius(10);

	while(window.isOpen()) { // game loop
		sf::Event event;
		while(window.pollEvent(event)) { // event loop
			switch (event.type) {
				case sf::Event::Closed:
					window.close();
					break;
				case sf::Event::KeyPressed:
					if(event.key.code == sf::Keyboard::Q)
						window.close();
					break;
				default:
					break;
			}			
		}

		sf::Vertex line[2];
		line[0] = sf::Vector2f(100,100);
		line[1] = sf::Vector2f(200,200);

		sf::Vector2f p(90,150);
		sf::Vector2f v(1, 0);
		float denom = v.y * (line[0].position.x - line[1].position.x) - v.x * (line[0].position.y - line[1].position.y);
		float c = -1; float t = -1;
		if (denom != 0){
			c = ( v.y * (line[0].position.x - p.x)  - v.x * (line[1].position.y - p.y) ) / denom;
			t = ( -(line[0].position.y-line[1].position.y)* (line[0].position.x-p.x) + (line[0].position.x-line[1].position.x)*(line[0].position.y - p.y) ) / denom;
		}

		sf::Vertex ray[2];
		ray[0] = p;
		ray[1] = p + t*v;

		// clear, draw, display (in that order!)
		window.clear(sf::Color(49, 100, 183, 200)); // lightish blue

		window.setView(view);
		
		window.draw(indicator);
		window.draw(line, 2, sf::Lines);
		window.draw(ray, 2, sf::Lines);
	
		window.display();
	}
	return 0;
}

