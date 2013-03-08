var ESQUERDA = 1,
	DIREITA  = 2,
	BAIXO    = 3,
	CIMA     = 4;

var spiral = function(width, height) {
	var result = [];
	var num = 1;

	for (var i = 0; i < height; ++i) {
		result[i] = [];
		for (var j = 0; j < width; ++j) {
			result[i][j] = num++;			
		}
		if(i%2 != 0) result[i] = result[i].reverse();
	}

	return result;
};

var matrizInicial = function(width, height){
	var result = [];
	for (var i = 0; i < height; ++i) {
		result[i] = [];
		for (var j = 0; j < width; ++j) {
			result[i][j] = 0;		
		}
	}
	return result;
}

var nextPosition = function(matrix, position) {
	var nextPosition = {col: position.col, lin: position.lin, direction: position.direction};
	switch(position.direction) {
		case DIREITA:
			nextPosition.col += 1;
		break;
		case BAIXO:
			if(position.lin < matrix.length-1){
				nextPosition.lin += 1;
			}
			else {
				nextPosition.col -= 1;
				nextPosition.direction = ESQUERDA;
			}
		break;
		case ESQUERDA:
			if(position.col === 0){
				nextPosition.lin -= 1;
				nextPosition.direction = CIMA;
			}
			else{
				nextPosition.col -= 1;				
			}
		break;	
		case CIMA:
			if(matrix[position.col-1][position.lin] != 0){
				nextPosition.lin += 1;
				nextPosition.direction = DIREITA;
			}
			else{
				nextPosition.col -= 1;
			}
		break;	
	}
	return nextPosition;
}

describe('spiral', function() {
  it('is trivial', function() {
    expect(spiral(1,1)).toEqual([
    	[1]
	]);
  });

  it('has elements in horizontal', function() {
    expect(spiral(2,1)).toEqual([
    	[1, 2]
	]);
  });

  it('has elements in vertical', function() {
    expect(spiral(1,2)).toEqual([
    	[1],
    	[2]
	]);
  });

  it('has elements in vertical and elements in horizontal', function() {
    expect(spiral(2,2)).toEqual([
    	[1, 2],
    	[4, 3]
	]);
  });

  it('has 3 in a row', function() {
    expect(spiral(3,2)).toEqual([
    	[1, 2, 3],
    	[6, 5, 4]
	]);
  });

  xit('3x3', function() {
    expect(spiral(3,3)).toEqual([
    	[1, 2, 3],
    	[8, 9, 4],
    	[7, 6, 5]
	]);
  });
});

describe('matrizInicial', function() {
  it("matriz 0", function(){
  	expect(matrizInicial(3,3)).toEqual([
  		[0, 0, 0],
    	[0, 0, 0],
    	[0, 0, 0]])
  });
});

describe('nextPosition', function() {

	it('should go to right', function() {
		expect(nextPosition(
			[[0, 0]],
			{col: -1, lin: 0, direction: DIREITA})
		)
		.toEqual({col: 0, lin: 0, direction: DIREITA });
	});

	it('should go to esq', function() {
		expect(nextPosition(
			[[1, 2],[0, 3]],
			{col: 1, lin: 1, direction: BAIXO})
		)
		.toEqual({col: 0, lin: 1, direction: ESQUERDA });
	});

	it('should go down', function() {
		expect(nextPosition(
			[[1],[2],[0]],
			{col: 0, lin: 1, direction: BAIXO})
		)
		.toEqual({col: 0, lin: 2, direction: BAIXO });
	});

	it('should go esquerda', function() {
		expect(nextPosition(
			[[1, 2, 3], [0, 5 ,4] ],
			{col: 1, lin: 1, direction: ESQUERDA})
		)
		.toEqual({col: 0, lin: 1, direction: ESQUERDA });
	});

	it('should go cima', function() {
		expect(nextPosition(
			[[1, 2, 3], 
			 [0, 0 ,4],
			 [7, 6 ,5]],
			{col: 0, lin: 2, direction: ESQUERDA})
		)
		.toEqual({col: 0, lin: 1, direction: CIMA });
	});

	it('should go to right because there is number up', function() {
		expect(nextPosition(
			[[1, 2, 3], 
			 [8, 0 ,4],
			 [7, 6 ,5]],
			{col: 0, lin: 1, direction: CIMA})
		)
		.toEqual({col: 1, lin: 1, direction: DIREITA });
	});
});