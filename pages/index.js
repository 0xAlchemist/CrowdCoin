import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button, Icon } from 'semantic-ui-react';
import Layout from '../components/layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();

		return { campaigns };
	}

	renderCampaigns() {
		const items = this.props.campaigns.map( (address) => {
			return {
				header: address,
				meta: `At address: ${address}`,
				description: (
					<Link route={`/campaigns/${address}`}>
						<a>View Campaign</a>
					</Link>
				),
				fluid: true
			};
		});

		return <Card.Group items={items} />;
	}

	render() {
		return (
		<Layout>
			<h3>Open Campaigns</h3>
			<Link route='/campaigns/new'>
			  <a>
					<Button floated='right' icon primary labelPosition='left'>Create Campaign <Icon name='add' /></Button>
			  </a>
			</Link>
			{this.renderCampaigns()}
		</Layout>
		);
	}
}

export default CampaignIndex;