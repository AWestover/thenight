
#include "Barrier.hpp"

Barrier::Barrier(sf::Vector2f posA, sf::Vector2f posB) {
	line[0] = posA;
	line[1] = posB;
}

void Barrier::render(sf::RenderWindow* window) {
	window->draw(line, 2, sf::Lines);
}

sf::Vector2f Barrier::rayCollide(sf::Vector2f p, sf::Vector2f v) {
	float denom = v.y * (line[0].position.x - line[1].position.x) - v.x * (line[0].position.y - line[1].position.y);
	if (denom == 0){
		return sf::Vector2f(-1, -1);
	}
	int c = ( v.y * (line[0].position.x - p.x)  - v.x * (line[1].position.y - p.y) ) / denom;
	int t = ( -(line[0].position.y-line[1].position.y)* (line[0].position.x-p.x) + (line[0].position.x-line[1].position.x)*(line[0].position.y - p.y) ) / denom;
	return sf::Vector2f(c, t);
}


