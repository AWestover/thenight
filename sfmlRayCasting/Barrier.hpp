#ifndef BARRIER_H
#define BARRIER_H

#include <SFML/Graphics.hpp>

class Barrier
{
private:
	sf::Vertex line[2];
public:
	Barrier(sf::Vector2f posA, sf::Vector2f posB);
	void render(sf::RenderWindow* window);
	sf::Vector2f rayCollide(sf::Vector2f p, sf::Vector2f v);
};

#endif /* BARRIER_H */
