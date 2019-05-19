
#include <SFML/Graphics.hpp>
#include "Barrier.hpp"

Barrier::Barrier(sf::Vector2f posA, sf::Vector2f posB) {
	line[0] = sf::Vertex(posA, sf::Color(255,0,255));
	line[1] = sf::Vertex(posB, sf::Color(255,255,0));
}

void Barrier::render(sf::RenderWindow* window) {
	window->draw(line, 2, sf::Lines);
}

sf::Vector2f Barrier::rayCollide(sf::Vector2f p, sf::Vector2f v) {
	sf::Vector2f a = line[0].position;
	sf::Vector2f b = line[1].position;

	float denom = v.x * (a.y - b.y) - v.y * (a.x - b.x);
	if (denom == 0){ // when is this 0 and why
		return sf::Vector2f(-1, -1);
	}

	float c = (-v.y*(a.x - p.x) + v.x*(a.y - p.y)) / denom;
	float t = ( (a.y - b.y)*(a.x - p.x) + (b.x - a.x)*(a.y - p.y)) / denom;

	return sf::Vector2f(c, t);
}


