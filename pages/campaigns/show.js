import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
	
	static async getInitialProps(props) {
		const campaign = Campaign(props.query.address);
		const summary = await campaign.methods.getSummary().call();

		return {
			name: summary[0],
			address: props.query.address,
			minimumContribution: summary[1],
			balance: summary[2],
			requestsCount: summary[3],
			approversCount: summary[4],
			manager: summary[5]
		};
	}

	renderCards() {
		const {
			balance,
			manager,
			minimumContribution,
			requestsCount,
			approversCount
		} = this.props;

		const cvBalance = web3.utils.hexToNumberString(balance._hex);
		const items = [
			{
				header: manager.toString(),
				meta: 'Address of the campaign Manager',
				description: 'The manager created this campaign and can create payment requests',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: web3.utils.hexToNumberString(minimumContribution._hex),
				meta: 'Minimum Contribution (in wei)',
				description: 'You must contribute at least this much wei to become an approver'
			},
			{
				header: web3.utils.hexToNumberString(requestsCount._hex),
				meta: 'Number of Requests',
				description: 'A request tries to withdraw money from the contract. Requests must be approved by campaign contributors'
			},
			{
				header: web3.utils.hexToNumberString(approversCount._hex),
				meta: 'Number of Approvers',
				description: 'Number of people who have already donated to the campaign'
			},
			{
				header: web3.utils.fromWei(cvBalance.toString(), 'ether'),
				meta: 'Campaign Balance (ether)',
				description: 'The amount of remaining spendable funds for this campaign'
			}
		];

		return <Card.Group items={items} />
	}

	render() {
		return(
			<Layout>
				<h2>{this.props.name}</h2>
				<h5 className='subtitle'>Campaign address: {this.props.address}</h5>
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							{this.renderCards()}
						</Grid.Column>
						<Grid.Column width={6}>
							<ContributeForm address={this.props.address} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Link route={`/campaigns/${this.props.address}/requests`}>
								<a>
									<Button primary>View Requests</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default CampaignShow;