
/*
 * AUTHOR: Alek Westover
 * PROGRAM: main.cpp  
*/

#include <SFML/Graphics.hpp>
#include <SFML/Audio.hpp>

#include <vector> 
#include <iostream>
#include <fstream>
#include <time.h>
#include <math.h>

#include "Yiffler.hpp"
#include "World.hpp"
#include "Barrier.hpp"

int main() {
	srand(time(NULL));

	// initialize window variables 
	sf::Vector2f screenDimensions(1024, 512);
	bool paused = false;
	bool showMap = true;
	bool showStats = true;
	sf::RenderWindow window;
	window.create(sf::VideoMode(screenDimensions.x, screenDimensions.y), "thenight");
	window.setFramerateLimit(MAX_FRAME_RATE);

	// views
	sf::View view(sf::Vector2f(screenDimensions.x/2, screenDimensions.y/2), screenDimensions); // center location, size
	view.setViewport(sf::FloatRect(0.0f,0.0f,1.0f,1.0f));

	sf::Clock clock;
	float dt, frameCounter=0;
	sf::Vector2f cameraPos(screenDimensions.x/2, screenDimensions.y/2);

	// initialize the game
	Yiffler* chicken;
	chicken = new Yiffler(sf::Vector2f(300,300));

	sf::CircleShape indicator;
	indicator.setRadius(10);

	std::vector <Barrier*> barriers;
	barriers.push_back(new Barrier(sf::Vector2f(0,0), sf::Vector2f(screenDimensions.x, 0)));
	barriers.push_back(new Barrier(sf::Vector2f(0,0), sf::Vector2f(0, screenDimensions.y)));
	barriers.push_back(new Barrier(sf::Vector2f(screenDimensions.x,0), sf::Vector2f(screenDimensions.x, screenDimensions.y)));
	barriers.push_back(new Barrier(sf::Vector2f(0,screenDimensions.y), sf::Vector2f(screenDimensions.x, screenDimensions.y)));
	
	barriers.push_back(new Barrier(sf::Vector2f(screenDimensions.x*0.3,screenDimensions.y*0.3), sf::Vector2f(screenDimensions.x*0.7, screenDimensions.y*0.3)));
	barriers.push_back(new Barrier(sf::Vector2f(screenDimensions.x*0.3, screenDimensions.y*0.3), sf::Vector2f(screenDimensions.x*0.3, screenDimensions.y*0.7)));
	barriers.push_back(new Barrier(sf::Vector2f(screenDimensions.x*0.7,screenDimensions.y*0.3), sf::Vector2f(screenDimensions.x*0.7, screenDimensions.y*0.7)));
	barriers.push_back(new Barrier(sf::Vector2f(screenDimensions.x*0.3, screenDimensions.y*0.7), sf::Vector2f(screenDimensions.x*0.7, screenDimensions.y*0.7)));

	for(int i = 0; i < 10; i++){
		sf::Vector2f pos(rand()%static_cast<int>(screenDimensions.x), rand()%static_cast<int>(screenDimensions.y));
		sf::Vector2f perturb(rand()%(static_cast<int>(screenDimensions.x/10)), rand()%(static_cast<int>(screenDimensions.y/10)));
		barriers.push_back(new Barrier(pos, pos+perturb));
	}

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
				case sf::Event::KeyReleased:
					break;
				case sf::Event::Resized:
					screenDimensions.x = event.size.width;
					screenDimensions.y = event.size.height;
					std::cout << screenDimensions.x << std::endl;
					view.setSize(screenDimensions);
					break;
				case sf::Event::LostFocus:
					paused = true;
					std::cout << "goodbye!!!" << std::endl;
					break;
				case sf::Event::GainedFocus:
					paused = false;
					std::cout  << "welcome back!!" << std::endl;
					break;
				default:
					break;
			}			
		}

		dt = clock.restart().asSeconds();
		if (paused)
			dt = 0;

		frameCounter += FRAME_SPEED*dt;
		if(frameCounter >= SWITCH_FRAME){
			frameCounter = 0;
		}

		if(sf::Keyboard::isKeyPressed(sf::Keyboard::A) ^ sf::Keyboard::isKeyPressed(sf::Keyboard::D)) {
			if(sf::Keyboard::isKeyPressed(sf::Keyboard::A))
				chicken->setVelX(-YIFFLER_SPEED);	
			else if(sf::Keyboard::isKeyPressed(sf::Keyboard::D))
				chicken->setVelX(YIFFLER_SPEED);	
		}
		if(sf::Keyboard::isKeyPressed(sf::Keyboard::W) ^ sf::Keyboard::isKeyPressed(sf::Keyboard::S)) {
			if(sf::Keyboard::isKeyPressed(sf::Keyboard::W))
				chicken->setVelY(-YIFFLER_SPEED);	
			else if(sf::Keyboard::isKeyPressed(sf::Keyboard::S))
				chicken->setVelY(YIFFLER_SPEED);	
		}
		chicken->applyVel(dt);

		cameraPos.x = chicken->getPosX() + TILE_WIDTH/2;
		if (cameraPos.x < screenDimensions.x/2)
			cameraPos.x = screenDimensions.x/2;
		if (cameraPos.x > WORLD_DIMENSIONS.x -screenDimensions.x/2)
			cameraPos.x = WORLD_DIMENSIONS.x -screenDimensions.x/2;
		cameraPos.y = chicken->getPosY() + TILE_WIDTH/2;
		if (cameraPos.y < screenDimensions.y/2)
			cameraPos.y = screenDimensions.y/2;
		if (cameraPos.y > WORLD_DIMENSIONS.y - screenDimensions.y/2)
			cameraPos.y = WORLD_DIMENSIONS.y - screenDimensions.y/2;
		view.setCenter(cameraPos);

		// clear, draw, display (in that order!)
		window.clear(sf::Color(49, 100, 183, 200)); // lightish blue

		window.setView(view);
		chicken->render(&window, &barriers);

		// there are gonna be like millions of collision detections here: absolute trash: quadtree anate it
		for(int i = 0; i < barriers.size(); i++){
			barriers[i]->render(&window);
		}

		window.display();
	}
	return 0;
}

