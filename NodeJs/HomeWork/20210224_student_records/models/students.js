const Sequelize = require('sequelize');

module.exports = class Students extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: Sequelize.INTEGER.UNSIGNED,
					allowNull: false,
					autoIncrement: true,
					unique: true,
				},
				name: {
					type: Sequelize.STRING(20),
					allowNull: false,
					primaryKey: true,
				},
				age: {
					type: Sequelize.INTEGER.UNSIGNED,
					defaultValue: 19,
				},
				sex: {
					type: Sequelize.STRING(6),
					allowNull: false,
				},
				height: {
					type: Sequelize.INTEGER.UNSIGNED,
					defaultValue: 180,
				},
				address: {
					type: Sequelize.STRING(50),
					defaultValue: '대한민국',
				},
			},
			{
				sequelize,
				timestamps: false,
				underscored: false,
				modelName: 'Students',
				tableName: 'students',
				paranoid: false,
				charset: 'utf8mb4',
				collate: 'utf8mb4_general_ci',
			}
		);
	}
};
