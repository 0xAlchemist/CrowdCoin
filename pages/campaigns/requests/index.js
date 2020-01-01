import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Link } from '../../../routes';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

	static async getInitialProps(props) {
		const { address } = props.query;
		const campaign = Campaign(address);
		const requestCount = await campaign.methods.getRequestCount().call();
		const approversCount = await campaign.methods.approversCount().call();

		const requests = await Promise.all(
			Array(parseInt(requestCount))
				.fill()
				.map((element, index) => {
					return campaign.methods.requests(index).call();
				})
		);

		return { address, requests, requestCount, approversCount };
	}

	renderRows() {
		return this.props.requests.map((request, index) => {
			return <RequestRow 
				key={index}
				id={index}
				request={request}
				address={this.props.address}
				approversCount={this.props.approversCount}
			/>;
		});
	}

	render() {
		const { Header, Row, HeaderCell, Body } = Table;
		const cvRequestCount = web3.utils.hexToNumberString(this.props.requestCount._hex);

		return(
			<Layout>
				<h3>Requests</h3>
				<Link route={`/campaigns/${this.props.address}/requests/new`}>
					<a>
						<Button icon primary floated="right" labelPosition="left" style={{marginBottom: 10}}>
							Add Request
							<Icon name='add' />
						</Button>
					</a>
				</Link>
				<Table celled>
					<Header>
						<Row>
							<HeaderCell>ID</HeaderCell>
							<HeaderCell>Description</HeaderCell>
							<HeaderCell>Amount</HeaderCell>
							<HeaderCell>Recipient</HeaderCell>
							<HeaderCell>Approval Count</HeaderCell>
							<HeaderCell>Approve</HeaderCell>
							<HeaderCell>Finalize</HeaderCell>
						</Row>
					</Header>
					<Body>
						{this.renderRows()}
					</Body>
				</Table>
				<div>Found {cvRequestCount} requests</div>
			</Layout>
		);
	}
}

export default RequestIndex;