
#ifndef YIFFLER_H
#define YIFFLER_H
# define PI 3.14159265358979323846

#include <SFML/Graphics.hpp>
#include "Barrier.hpp"
#include <vector> 

class Yiffler {
private:
	sf::Vector2f pos;
	sf::Vector2f vel;

	sf::CircleShape circle;
public:
	Yiffler(sf::Vector2f pos_);
	float getPosX();
	float getPosY();
	void setVelX(float velX);
	void setVelY(float velY);
	void applyVel(float dt);
	void render(sf::RenderWindow* window, std::vector <Barrier*>* barriers);
};

#endif /* YIFFLER_H */
