
#include "Yiffler.hpp"
#include <math.h>
#include "World.hpp"

Yiffler::Yiffler(sf::Vector2f pos_) {
	pos = pos_;
	vel.x = 0; vel.y = 0;
	circle.setRadius(YIFFLER_R/10);
	circle.setFillColor(sf::Color(255,0,0));
}

void Yiffler::setVelX(float velX) {
	vel.x = velX;
}
void Yiffler::setVelY(float velY) {
	vel.y = velY;
}
float Yiffler::getPosX() {
	return pos.x;
}
float Yiffler::getPosY() {
	return pos.y;
}

void Yiffler::applyVel(float dt) {
	pos += dt * vel;	
}

void Yiffler::render(sf::RenderWindow* window, std::vector <Barrier*>* barriers) {
	sf::VertexArray tfan(sf::TriangleFan, NUM_RAYS+2);
	tfan[0].position = pos;

	// define the position of the triangle's points, it is a fan so we just need to specify the points on the outside
	for(int i = 0; i < NUM_RAYS; i++){
		sf::Vector2f curRay(YIFFLER_R*cos((2*PI*i)/NUM_RAYS), YIFFLER_R*sin((2*PI*i)/NUM_RAYS));
		float minT = -1;
		for(int i = 0; i < barriers->size(); i++){
			sf::Vector2f res = barriers->at(i)->rayCollide(pos, curRay);
			if(res.x <= 1 && res.x >= 0 && res.y >= 0){
				if (minT == -1 || res.y < minT){
					minT = res.y;
				}
			}
		}
		tfan[i+1].position = pos + minT*curRay;
	} 
	tfan[NUM_RAYS+1].position = tfan[1].position;

	window->draw(tfan);

	circle.setPosition(pos);
	window->draw(circle);

}

